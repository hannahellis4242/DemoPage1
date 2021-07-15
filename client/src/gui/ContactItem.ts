import Component from "./Component";
import Contact from "../contacts/contacts";

export default class ContactItem extends Component {
  constructor(public data: Contact, parent: Component | null = null) {
    super(parent);
  }

  setData(data: Contact) {
    this.data = data;
  }
}
