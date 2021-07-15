import Component from "./Component";
export type ButtonCallback = () => void;
export default class Button extends Component {
  constructor(
    public text: string,
    public callback: ButtonCallback,
    parent: Component | null = null
  ) {
    super(parent);
  }
}
