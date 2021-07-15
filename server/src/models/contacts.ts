export class Address {
  constructor(
    public street: string,
    public county: string,
    public postcode: string
  ) {}
}

export class Details {
  constructor(public email: string, public telephone: string) {}
}

export default class Contact {
  constructor(
    public name: string,
    public address: Address,
    public details: Details
  ) {}
}
