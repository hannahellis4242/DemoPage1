import axios, { AxiosResponse } from "axios";
import Contact, { Address, Details } from "../contacts/contacts";
import ContactItem from "./ContactItem";
import ContactItems from "./ContactItems";
import Controller from "./Controller";
import ControlPannel from "./ControlPannel";
import MainComponent from "./MainComponent";
import Loading from "./Loading";

interface DatabaseContact {
  id: string;
  address: string;
  county: string;
  customer: string;
  email: string;
  joined: string;
  postcode: string;
  telephone: string;
}

const addDatabaseElement = (item: DatabaseContact, contacts: ContactItems) => {
  const address = new Address(item.address, item.county, item.postcode);
  const details = new Details(item.email, item.telephone);
  const contact = new Contact(item.customer, address, details);
  contacts.addItem(contact);
};

const addDatabaseElements = async (
  main: MainComponent,
  controller: Controller
) => {
  await axios
    .get("./addresses")
    .then((value: AxiosResponse<DatabaseContact[]>) => {
      const contacts = new ContactItems(main);
      value.data.forEach((item: DatabaseContact) => {
        const address = new Address(item.address, item.county, item.postcode);
        const details = new Details(item.email, item.telephone);
        const contact = new Contact(item.customer, address, details);
        contacts.addItem(contact);
        main.addChild(contacts);
      });
    })
    .catch((err: Error) => {
      throw err;
    })
    .finally(() => {
      controller.setModel(main);
    });
};

const buildLoadingScreen = (controller: Controller) => {
  const main = new MainComponent();
  const loading = new Loading(main);
  main.addChild(loading);
  controller.setModel(main);
};

export const buildWelcomeView = (controller: Controller) => {
  const main = new MainComponent();
  {
    const pannel = new ControlPannel(main);
    pannel.addButton("show all", () => buildAllEntriesView(controller));
    pannel.addButton("add", () => buildAddView(controller));
    main.addChild(pannel);
  }
  controller.setModel(main);
};

export const buildAllEntriesView = (controller: Controller) => {
  buildLoadingScreen(controller);
  //build the data view
  {
    const main = new MainComponent();
    {
      const pannel = new ControlPannel(main);
      pannel.addButton("test2", () => testBuilder2(controller));
      main.addChild(pannel);
    }
    addDatabaseElements(main, controller);
  }
};

export const buildAddView = (controller: Controller) => {
  const main = new MainComponent();
  controller.setModel(main);
};

export const testBuilder2 = (controller: Controller) => {
  const main = new MainComponent();
  {
    const pannel = new ControlPannel(main);
    pannel.addButton("show all", () => buildAllEntriesView(controller));
    main.addChild(pannel);
  }
  {
    const a = new Address("2 b street", "another county", "CC11 2DD");
    const d = new Details("another@person.com", "0123456789");

    const contact = new Contact("Jane Dobson", a, d);
    const items = new ContactItems(main);
    items.addChild(new ContactItem(contact, items));
    main.addChild(items);
  }
  controller.setModel(main);
};
