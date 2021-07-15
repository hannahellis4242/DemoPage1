/*import Contact, { Address, Details } from "../contacts/contacts";
import ContactItem from "./ContactItem";
import ContactItems from "./ContactItems";
import ControlPannel from "./ControlPannel";
import MainComponent from "./MainComponent";

export const addContactBuilder = () => {
  const main = new MainComponent();
  {
    const pannel = new ControlPannel(main);
    main.addChild(pannel);
  }
  {
    const a = new Address("1 a street", "a county", "AA00 0BB");
    const d = new Details("person@person.com", "0123456789");

    const contact = new Contact("Bob Smith", a, d);
    const items = new ContactItems(main);
    items.addChild(new ContactItem(contact, items));
    items.addChild(new ContactItem(contact, items));
    main.addChild(items);
  }
  return main;
};*/
