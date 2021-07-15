import Component from "./Component";

export default class Composite extends Component {
  public children: Component[];
  constructor(parent: Component | null = null) {
    super(parent);
    this.children = [];
  }

  addChild(c: Component) {
    c.setParent(this);
    this.children.push(c);
  }

  clear() {
    this.children = [];
  }
}
