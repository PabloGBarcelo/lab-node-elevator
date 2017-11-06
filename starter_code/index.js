const Elevator = require('./elevator.js');
const Person = require('./person.js');

let elevator = new Elevator();
elevator.update();
elevator.start();

let person1 = new Person("pepe", 0, 5);
let person5 = new Person("pepe", 0, 8);
let person2 = new Person("maria", 2, 0);
let person3 = new Person("jose",3,1);
let person4 = new Person("anciano",3,2);
elevator.call(person1);
elevator.call(person2);
elevator.call(person3);
elevator.call(person4);
elevator.call(person5);

setInterval(() => {
 elevator.call(new Person(makeid(), Math.round(Math.random() * 9), Math.round(Math.random() * 9)));
},5000);

function makeid() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

console.log(makeid());
