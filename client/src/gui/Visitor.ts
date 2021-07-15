import Component from "./Component";
export default interface Visitor {
  visit: (visitable: Component) => void;
}
