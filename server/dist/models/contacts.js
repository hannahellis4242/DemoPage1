"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Details = exports.Address = void 0;
class Address {
    constructor(street, county, postcode) {
        this.street = street;
        this.county = county;
        this.postcode = postcode;
    }
}
exports.Address = Address;
class Details {
    constructor(email, telephone) {
        this.email = email;
        this.telephone = telephone;
    }
}
exports.Details = Details;
class Contact {
    constructor(name, address, details) {
        this.name = name;
        this.address = address;
        this.details = details;
    }
}
exports.default = Contact;
