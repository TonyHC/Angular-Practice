import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

let myShape = new Shape(16, 59);
console.log(myShape.getInfo());

let myCircle = new Circle(3, 6, 12);
console.log(myCircle.getInfo());

let myRectangle = new Rectangle(2, 4, 12, 41);
console.log(myRectangle.getInfo());