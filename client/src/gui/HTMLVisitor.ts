import Visitor from "./Visitor";
import ContactItem from "./ContactItem";
import ControlPannel from "./ControlPannel";
import ContactItems from "./ContactItems";
import Component from "./Component";
import MainComponent from "./MainComponent";
import Controller from "./Controller";
import Loading from "./Loading";
import Button from "./Button";
import Welcome from "./Welcome";
import AddComponent from "./AddComponent";

const createPannel = (
  pannel: ControlPannel,
  controller: Controller,
  element: HTMLElement
) => {
  const div = document.createElement("div");
  div.id = "toolbar";
  pannel.children.forEach((child: Component) => {
    if (child instanceof Button) {
      const button = document.createElement("button");
      button.innerText = child.text;
      button.addEventListener("click", child.callback);
      div.appendChild(button);
    }
  });
  element.appendChild(div);
};

const createItem = (visitable: ContactItem, element: HTMLElement) => {
  if (visitable.data) {
    const item = document.createElement("section");
    item.classList.add("contact");
    {
      const header = document.createElement("header");
      header.innerText = visitable.data.name;
      item.appendChild(header);
    }
    {
      const address = document.createElement("article");
      {
        const list = document.createElement("ul");
        {
          const li = document.createElement("li");
          li.innerText = visitable.data.address.street;
          list.appendChild(li);
        }
        {
          const li = document.createElement("li");
          li.innerText = visitable.data.address.county;
          list.appendChild(li);
        }
        {
          const li = document.createElement("li");
          li.innerText = visitable.data.address.postcode;
          list.appendChild(li);
        }
        address.appendChild(list);
      }
      item.appendChild(address);
    }
    {
      const details = document.createElement("article");
      {
        const list = document.createElement("ul");
        {
          const li = document.createElement("li");
          li.innerText = visitable.data.details.email;
          list.appendChild(li);
        }
        {
          const li = document.createElement("li");
          li.innerText = visitable.data.details.telephone;
          list.appendChild(li);
        }
        details.appendChild(list);
      }
      item.appendChild(details);
    }
    element.appendChild(item);
  }
};

const createItems = (items: ContactItems, element: HTMLElement) => {
  const div = document.createElement("div");
  div.id = "contacts";
  const children = items.children;
  items.children.forEach((child: Component) => {
    if (child instanceof ContactItem) {
      createItem(child, div);
    }
  });
  element.appendChild(div);
};

const createMain = (
  main: MainComponent,
  controller: Controller,
  element: HTMLElement
) => {
  //clear everything
  while (element.lastChild) {
    element.lastChild.remove();
  }
  //start adding stuff
  const div = document.createElement("div");
  div.id = "main";
  const subVisitor = new HTMLVisitor(div, controller);
  main.children.forEach((child: Component) => child.accept(subVisitor));
  element.appendChild(div);
};

const createLoading = (visitable: Loading, element: HTMLElement) => {
  const div = document.createElement("div");
  div.innerText = "Loading\nPlease wait.";
  div.id = "loading";
  element.appendChild(div);
};

const createAdd = (
  visitable: AddComponent,
  controller: Controller,
  element: HTMLElement
) => {
  const form = document.createElement("form");
  const name = document.createElement("input");
  const address = document.createElement("input");
  const county = document.createElement("input");
  const postcode = document.createElement("input");
  const email = document.createElement("input");
  const tel = document.createElement("input");
  {
    const label = document.createElement("label");
    label.htmlFor = "NameInput";
    label.innerText = "Name";
    form.appendChild(label);
    name.id = "NameInput";
    form.appendChild(name);
  }
  {
    const div = document.createElement("div");
    div.id = "address-input";
    {
      const label = document.createElement("label");
      label.htmlFor = "Address1Input";
      label.innerText = "Address";
      div.appendChild(label);
      address.id = "Address1Input";
      div.appendChild(address);
    }
    {
      const label = document.createElement("label");
      label.htmlFor = "CountyInput";
      label.innerText = "County";
      div.appendChild(label);
      county.id = "CountyInput";
      div.appendChild(county);
    }
    {
      const label = document.createElement("label");
      label.htmlFor = "PostcodeInput";
      label.innerText = "Postcode";
      div.appendChild(label);
      postcode.id = "PostcodeInput";
      div.appendChild(postcode);
    }
    form.appendChild(div);
  }
  {
    const div = document.createElement("div");
    div.id = "detail-input";
    {
      const label = document.createElement("label");
      label.htmlFor = "emailInput";
      label.innerText = "Email";
      div.appendChild(label);
      email.id = "emailInput";
      email.type = "email";
      div.appendChild(email);
    }
    {
      const label = document.createElement("label");
      label.htmlFor = "TelephoneInput";
      label.innerText = "Telephone";
      div.appendChild(label);
      tel.id = "TelephoneInput";
      tel.type = "tel";
      div.appendChild(tel);
    }
    form.appendChild(div);
  }
  {
    const input = document.createElement("input");
    input.type = "submit";
    input.innerText = "add";
    input.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      const data = {
        customer: name.value,
        address: address.value,
        county: county.value,
        postcode: postcode.value,
        email: email.value,
        telephone: tel.value,
        joined: new Date().toString(),
      };
      visitable.callback(data);
    });
    form.appendChild(input);
  }
  element.appendChild(form);
};

const createWelcome = (visitable: Welcome, element: HTMLElement) => {
  const div = document.createElement("div");
  div.innerText = "Welcome";
  div.id = "welcome";
  element.appendChild(div);
};

export default class HTMLVisitor implements Visitor {
  constructor(private element: HTMLElement, private controller: Controller) {}
  visit(visitable: Component) {
    if (visitable instanceof ContactItems) {
      createItems(visitable, this.element);
      return;
    }
    if (visitable instanceof ControlPannel) {
      createPannel(visitable, this.controller, this.element);
      return;
    }
    if (visitable instanceof MainComponent) {
      createMain(visitable, this.controller, this.element);
    }
    if (visitable instanceof Loading) {
      createLoading(visitable, this.element);
    }
    if (visitable instanceof Welcome) {
      createWelcome(visitable, this.element);
    }
    if (visitable instanceof AddComponent) {
      createAdd(visitable, this.controller, this.element);
    }
  }
}
