export interface DatabaseContactOut {
  id: string;
  address: string;
  county: string;
  customer: string;
  email: string;
  joined: string;
  postcode: string;
  telephone: string;
}

export interface DatabaseContactIn {
  address: string;
  county: string;
  customer: string;
  email: string;
  joined: string;
  postcode: string;
  telephone: string;
}
