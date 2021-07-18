import axios, { AxiosResponse } from "axios";
import Contact, { Address, Details } from "../contacts/contacts";
import ContactItem from "./ContactItem";
import ContactItems from "./ContactItems";
import Controller from "./Controller";
import ControlPannel from "./ControlPannel";
import MainComponent from "./MainComponent";
import Loading from "./Loading";
import Welcome from "./Welcome";
import AddComponent from "./AddComponent";

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
  buildLoadingScreen(controller);
  const main = new MainComponent();
  {
    const pannel = new ControlPannel(main);
    pannel.addButton("show all", () => buildAllEntriesView(controller));
    pannel.addButton("add", () => buildAddView(controller));
    main.addChild(pannel);
  }
  {
    const welcome = new Welcome(main);
    main.addChild(welcome);
  }
  controller.setModel(main);
};

export const buildAllEntriesView = (controller: Controller) => {
  buildLoadingScreen(controller);
  {
    const main = new MainComponent();
    {
      const pannel = new ControlPannel(main);
      pannel.addButton("Home", () => buildWelcomeView(controller));
      pannel.addButton("Add", () => buildAddView(controller));
      main.addChild(pannel);
    }
    addDatabaseElements(main, controller);
  }
};

export const buildAddView = (controller: Controller) => {
  const main = new MainComponent();
  {
    const pannel = new ControlPannel(main);
    pannel.addButton("Home", () => buildWelcomeView(controller));
    pannel.addButton("Cancel", () => buildWelcomeView(controller));
    main.addChild(pannel);
  }
  {
    const addElement = new AddComponent(main);
    main.addChild(addElement);
  }
  controller.setModel(main);
};
