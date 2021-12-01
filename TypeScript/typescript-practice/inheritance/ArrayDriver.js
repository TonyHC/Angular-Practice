"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
const Circle_1 = require("./Circle");
const Rectangle_1 = require("./Rectangle");
let myShape = new Shape_1.Shape(16, 59);
let myCircle = new Circle_1.Circle(3, 6, 12);
let myRectangle = new Rectangle_1.Rectangle(2, 4, 12, 41);
// Array of Shapes
let shapes = [];
shapes.push(myShape);
shapes.push(myCircle);
shapes.push(myRectangle);
for (let shape of shapes) {
    console.log(shape.getInfo());
}
