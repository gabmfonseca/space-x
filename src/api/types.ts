export interface LaunchAPI {
  id: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
  };
  crew: LaunchCrew[];
  name: string;
  date_local: string;
  details: string | null;
  success: boolean;
  upcoming: boolean;
  rocket: string;
}

export interface Launch extends LaunchAPI {
  patchUrl?: string;
  missionName: string;
  date: string;
  rocketName: string | null;
}

export interface LaunchCrew {
  crew: string;
  role: string;
}

export interface CrewMember {
  id: string;
  name: string | null;
  agency: string | null;
  image: string | null;
  wikipedia: string | null;
  launches: string[];
  status: 'active' | 'inactive' | 'retired' | 'unknown';
}

export interface Payloads {
  id: string;
  name: string | null;
  type: string | null;
  nationalities: string[];
  manufacturers: string[];
  mass_kg: number | null;
  orbit: string | null;
}

export interface LaunchDetails extends Launch {
  crewDetails: CrewMember[];
  payloadsDetails: Payloads[];
}
