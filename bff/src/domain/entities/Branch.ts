export interface Branch {
  id: string;
  name: string;
  city: string;
  state: string; // UF code e.g. "SP"
  lat: number;
  lng: number;
  openedAt: string; // ISO date
  active: boolean;
}
