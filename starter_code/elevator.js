class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = []; // Have floor to go
    this.direction  = 'up';
    this.interval;
    this.waitingList = []; // Waiting for elevator in floor
    this.passengers = []; // Currently in elevator
  }

  start() {
    this.interval = setInterval(() => this.update(),1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  update() {
    this.log();
    if (this.requests.length!=0){
      if (this.floor < this.requests[0]){
        this.floorUp();
      } else {
        this.floorDown();
      }
    }
    if (this.requests[0] == this.floor){
      this._passengersEnter();
      this._passengersLeave();
    }
    console.log(this.requests);
    console.log(this.waitingList);
    console.log(this.passengers);
  }

  _passengersEnter() {
    // Entra en ascensor y marca el floor al que quiere ir (PRIORITARIO).
    console.log(`Welcome to floor ${this.floor}`);
    this.waitingList.forEach((person) => {
      if (person.originFloor == this.floor){
      this.requests.shift();
      // Insert in request floor where go with preference over the other.
      this.requests.sort((a,b) => a-b).unshift(person.destinationFloor);
      // LOG
      console.log(`${person.name} has enter the elevator`);
      // Insert in elevator and remove from waitingList
      this.passengers.push(person);
      }
    });
    // Remove all mounted passengers:
    this.waitingList = this.waitingList.filter((obj) => {
      return obj.originFloor !== this.floor;
    });
  };

  _passengersLeave() {
    // Sale del ascensor y se saca de requests.
    this.passengers.forEach((personGoesOut) => {
      if (personGoesOut.destinationFloor == this.floor){
        console.log(`Bye ${personGoesOut.name} in floor ${this.floor}`);
        // Go out from elevator
        this.requests.shift();
    }
  });
  // Remove all arrive passengers
  this.passengers = this.passengers.filter((obj) => {
    return obj.destinationFloor !== this.floor;
  });
};

  floorUp() {
    if ((this.floor + 1) < this.MAXFLOOR){
      this.floor += 1;
    }
    else console.log("IF YOU GO UP WILL LAUNCH THE ROCKET!");
  }

  floorDown() {
    if (this.floor - 1 < 0) console.log("WANT TO BE A MOLE?");
    else{
      this.floor -= 1;
    }
  }

  call(person) { // Call, insert request of originFloor and stay waitingList.
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }

  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);}
}

module.exports = Elevator;
