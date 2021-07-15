import Visitor from "./Visitor";
export default class Component {
  constructor(protected parent: Component | null = null) {}
  setParent(p: Component | null) {
    this.parent = p;
  }
  accept(v: Visitor) {
    v.visit(this);
  }
}
