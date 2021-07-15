import Component from "./Component";
import Composite from "./Composite";
import Button, { ButtonCallback } from "./Button";

export default class ControlPannel extends Composite {
  constructor(public parent: Component | null = null) {
    super(parent);
  }
  addButton(text: string, callback: ButtonCallback) {
    this.addChild(new Button(text, callback, this));
  }
}
