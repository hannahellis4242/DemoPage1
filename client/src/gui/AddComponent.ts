import Component from "./Component";
import { DatabaseContactIn } from "../contacts/DatabaseContact";

export type AddCallBack = (data: DatabaseContactIn) => void;
export default class AddComponent extends Component {
  constructor(p: Component | null, public callback: AddCallBack) {
    super(p);
  }
}
