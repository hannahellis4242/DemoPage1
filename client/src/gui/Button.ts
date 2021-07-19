import Component from "./Component";
import { ButtonCallback } from "./ButtonCallback";
export default class Button extends Component {
  constructor(
    public text: string,
    public callback: ButtonCallback,
    parent: Component | null = null
  ) {
    super(parent);
  }
}
