import { Shape } from "./Shape";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

let myShape = new Shape(16, 59);
let myCircle = new Circle(3, 6, 12);
let myRectangle = new Rectangle(2, 4, 12, 41);

// Array of Shapes
let shapes: Shape[] = [];

shapes.push(myShape);
shapes.push(myCircle);
shapes.push(myRectangle);

for (let shape of shapes) {
    console.log(shape.getInfo());
}