import Subject from "./Subject";
import MainComponent from "./MainComponent";
//import { testBuilder, testBuilder2 } from "./testBuilder";

export default class Controller {
  constructor(private subject: Subject) {}

  /*setTestMode1() {
    testBuilder(this);
  }

  setTestMode2() {
    testBuilder2(this);
  }*/

  setModel(main: MainComponent) {
    this.subject.setModel(main);
  }
}
