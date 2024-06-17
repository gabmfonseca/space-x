export interface Launch {
  id: string;
  patch: string;
  missionName: string;
  date: string;
  details: string;
  success: boolean;
  upcoming: boolean;
  rocketName: string;
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
