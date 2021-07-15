import Visitor from "./Visitor";
import ContactItem from "./ContactItem";
import ControlPannel from "./ControlPannel";
import ContactItems from "./ContactItems";
import Component from "./Component";
import MainComponent from "./MainComponent";
import Controller from "./Controller";
import Loading from "./Loading";
import Button from "./Button";

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
  console.log("90");
  console.log(items);
  console.log(items.children);
  const children = items.children;
  console.log(children.length);
  items.children.forEach((child: Component) => {
    console.log(child);
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

export default class HTMLVisitor implements Visitor {
  constructor(private element: HTMLElement, private controller: Controller) {}
  visit(visitable: Component) {
    if (visitable instanceof ContactItems) {
      console.log("125");
      console.log(visitable);
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
  }
}
