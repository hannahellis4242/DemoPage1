import MainComponent from "./MainComponent";
import Component from "./Component";

type Observer = (x: Component) => void;
export default class Subject {
  private model: MainComponent;
  private observers: Observer[];
  constructor() {
    this.observers = [];
    this.model = new MainComponent();
  }

  setModel(a: MainComponent) {
    this.model = a;
    this.notify();
  }

  attach(o: Observer) {
    this.observers.push(o);
  }

  notify() {
    this.observers.forEach((observer: Observer) => observer(this.model));
  }
}
