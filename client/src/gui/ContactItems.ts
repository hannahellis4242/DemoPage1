import ContactItem from "./ContactItem";
import Composite from "./Composite";
import Component from "./Component";
import Contact from "../contacts/contacts";

export default class ContactItems extends Composite {
  constructor(public parent: Component | null = null) {
    super(parent);
  }

  addItem(item: Contact) {
    const itemComponent = new ContactItem(item, this);
    this.addChild(itemComponent);
  }
}
