import HTMLVisitor from "./gui/HTMLVisitor";
import Subject from "./gui/Subject";
import Component from "./gui/Component";
import { buildWelcomeView } from "./gui/builders";
import Controller from "./gui/Controller";

const subject = new Subject();
const controller = new Controller(subject);
const visitor = new HTMLVisitor(document.body, controller);

subject.attach((x: Component) => {
  x.accept(visitor);
});

buildWelcomeView(controller);
