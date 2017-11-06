class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.direction  = 'up';
    this.interval;
  }

  start() {
    this.interval = setInterval(() => this.update(),1000);
  }
  
  stop() {
    clearInterval(this.interval);
  }

  update() {
    this.log();
  }

  _passengersEnter() { }

  _passengersLeave() { }

  floorUp() {
    console.log(this.floor);
    console.log(this.MAXFLOOR);
    if ((this.floor + 1) < this.MAXFLOOR) this.floor += 1;
    else console.log("IF YOU GO UP WILL LAUNCH THE ROCKET!");
  }

  floorDown() {
    if (this.floor - 1 < 0) console.log("WANT TO BE A MOLE?");
    else this.floor -= 1;
  }

  call(person) {
    this.requests.push(person);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);}
}

module.exports = Elevator;
