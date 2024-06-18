import {
  CrewMember,
  Launch,
  LaunchAPI,
  LaunchCrew,
  LaunchDetails,
  Payloads,
} from './types';

const BASE_URL = 'https://api.spacexdata.com';
const LAUNCHES_URL = `${BASE_URL}/v5/launches`;

const getRocketName = async (id: string): Promise<string | null> => {
  const url = `${BASE_URL}/v4/rockets/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parseData = (data: LaunchAPI): Omit<Launch, 'rocketName'> => {
  return {
    ...data,
    patchUrl: data.links.patch.small || undefined,
    date: new Date(data.date_local).toLocaleDateString(),
    missionName: data.name,
  };
};

export const getAllLaunches = async (): Promise<Launch[]> => {
  try {
    const response = await fetch(LAUNCHES_URL);
    const data = await response.json();

    const launches = await Promise.all(
      data?.map(async (launch: LaunchAPI) => {
        const rocketName = await getRocketName(launch.rocket);
        return { ...parseData(launch), rocketName };
      })
    );

    return launches;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAdditionalInfo = async (
  url: string
): Promise<CrewMember | Payloads | null> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLaunchDetails = async (
  id: string
): Promise<LaunchDetails | null> => {
  try {
    // fetch main launch info
    const response = await fetch(`${LAUNCHES_URL}/${id}`);
    const data = await response.json();

    // fetch rocket name
    const rocketName = await getRocketName(data.rocket);

    // fetch crew additional information
    const crewDetails = await Promise.all(
      data.crew?.map(async ({ crew }: LaunchCrew) => {
        const url = `${BASE_URL}/v4/crew/${crew}`;
        return await getAdditionalInfo(url);
      })
    );

    // fetch payloads additional information
    const payloadsDetails = await Promise.all(
      data.payloads?.map(async (id: string) => {
        const url = `${BASE_URL}/v4/payloads/${id}`;
        return await getAdditionalInfo(url);
      })
    );

    const details = {
      ...parseData(data),
      rocketName,
      crewDetails,
      payloadsDetails,
    };

    return details;
  } catch (error) {
    console.error(error);
    return null;
  }
};
