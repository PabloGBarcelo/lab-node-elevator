let chalk = require('chalk');

class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = []; // Have floor to go
    this.direction = 'up';
    this.interval;
    this.waitingList = []; // Waiting for elevator in floor
    this.passengers = []; // Currently in elevator
  }

  start() {
    this.interval = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  floorUp() {
    if ((this.floor + 1) < this.MAXFLOOR) {
      this.floor += 1;
    } else console.log("IF YOU GO UP WILL LAUNCH IN ROCKET!");
  }

  floorDown() {
    if (this.floor - 1 < 0) console.log("WANT TO BE A MOLE?");
    else {
      this.floor -= 1;
    }
  }

  update() {
    if (this.requests.length != 0) {
      if (this.floor < this.requests[0]) {
        this.direction = "up";
        this.floorUp();
      } else if (this.floor > this.requests[0]) {
        this.direction = "down";
        this.floorDown();
      }
      this.enterAndExit();
    }
    this.log();
    console.log(this.requests);
    console.log(this.waitingList);
    console.log(this.passengers);
  }

  _passengersEnter() {
    // Entra en ascensor y marca el floor al que quiere ir (PRIORITARIO).
    this.waitingList.forEach((person) => {
      if (person.originFloor == this.floor) {
        // Insert in request floor where go with preference over the other.
        this.requests.push(person.destinationFloor);
        // LOG
        console.log(chalk.green(`${person.name} has enter the elevator`));
        // Insert in elevator
        this.passengers.push(person);
      }
    });
    // Remove all mounted passengers from waitingList:
    this.waitingList = this.waitingList.filter((obj) => {
      return obj.originFloor !== this.floor;
    });
  };

  _passengersLeave() {
    // Exit from elevator and remove from passengers.
    this.passengers.forEach((personGoesOut) => {
      if (personGoesOut.destinationFloor == this.floor) {
        console.log(chalk.red(`Bye ${personGoesOut.name} in floor ${this.floor}`));
        // Go out from elevator
      }
    });
    // Remove all passengers in the destination floor
    this.passengers = this.passengers.filter((obj) => {
      return obj.destinationFloor !== this.floor;
    });
    this._removeRequestsRepeatedAndArrived();
  };

  _removeRequestsRepeatedAndArrived() {
    // Remove duplicate values
    this.requests = this.getUniqueValues(this.requests);
    // Remove same floor (arrive)
    this.requests = this.requests.filter((obj) => {
      return obj !== this.floor;
    });
  }

  call(person) { // Call, insert request of originFloor and stay waitingList.
    this.requests.push(person.originFloor);
    // this.requests = this.getUniqueValues(this.requests);
    this.waitingList.push(person);
  }

  log() {
    console.log(chalk.yellow(`Direction: ${this.direction} | Floor: ${this.floor}`));
  }

  getUniqueValues(array) {
    var unique = array.filter((elem, index, self) => {
      return index == self.indexOf(elem);
    });
    return unique;
  }

  enterAndExit() {
    this._passengersEnter();
    this._passengersLeave();
  }
}

module.exports = Elevator;
