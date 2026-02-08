export interface Incident {
  _id: string;
  status: string;
  item: string;
  description: string;
  owner: string;
  tag: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  projectPlan: {
    _id: string;
  };
  status: string;
  img: string;
  lastVisit: string;
  position: {
    _id: string;
    lat: number;
    lng: number;
  };
  users: Array<{
    name: string;
    lastName: string;
  }>;
  clientData: {
    title: string;
    _id: string;
  };
  city: string;
  lastUpdated: string;
  partnerClients: Array<any>;
  companyId: string;
  address: string;
  projectClientAdmin: Array<string>;
  projectPlanData: {
    plan: string;
  };
  createdAt: string;
  incidents: Array<Incident>;
  country?: string | number;
}
