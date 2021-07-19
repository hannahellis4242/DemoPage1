import Subject from "./Subject";
import MainComponent from "./MainComponent";

export default class Controller {
  constructor(private subject: Subject) {}

  setModel(main: MainComponent) {
    this.subject.setModel(main);
  }
}
