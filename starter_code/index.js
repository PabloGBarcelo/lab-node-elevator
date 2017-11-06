const Elevator = require('./elevator.js');
const Person = require('./person.js');

let elevator = new Elevator();
elevator.update();
elevator.start();
elevator.floorUp();
elevator.floorDown();
elevator.floorDown();


let person1 = new Person("pepe", 0, 5);
let person2 = new Person("maria", 2, 0);
let person3 = new Person("jose",3,1);
elevator.call(person1);
elevator.call(person2);
elevator.call(person3);
