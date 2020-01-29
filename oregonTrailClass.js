class Traveler {
    constructor (name, food=1, isHealthy=true) {
        this.name = name
        this.food = food
        this.isHealthy = isHealthy
    }
    hunt () {
        return this.food+=2
    }
    eat() {
        if (this.food > 0) {
            return this.food -= 1
        } else if (this.food == 0) {
            return this.isHealthy = false
        }
    }
}

class Doctor extends Traveler {
    constructor (name, food=1, isHealthy=true) {
        super(name, food, isHealthy)
    }
    heal (traveler) {
        return traveler.isHealthy = true
    }
}
class Hunter extends Traveler {
    constructor (name, food=2, isHealthy=true) {
        super(name, food, isHealthy)
    }
    hunt () {
        return this.food += 5
    }
    eat () {
        if (this.food >= 2) {
            this.food -= 2
        } else if (this.food < 2) {
            this.isHealthy = false
        }
        return this.food
    }
    giveFood (traveler, numOfFoodUnits) {
        if (this.food >= numOfFoodUnits) {
            this.food -= numOfFoodUnits
            traveler.food += numOfFoodUnits
        }
        return traveler.food
    }
}

class Wagon {
    constructor (capacity, passengers=[]) {
        this.capacity = capacity;
        this.passengers = passengers;
    }
    getAvailableSeatCount () {
        return this.capacity - this.passengers.length
    }
    join (traveler) {
        if (this.getAvailableSeatCount() > 0) {
            this.passengers.push(traveler)
            return this.capacity - this.passengers
        } else {
            return this.capacity - this.passengers.length
        }
    }
    shouldQuarantine () {
        for (let i=0; i<this.passengers.length; i++) {
            if (this.passengers[i].isHealthy == false) {
                return true
            }
        }
        return false
    }
    totalFood () {
        let total = 0;
        for (let i=0; i<this.passengers.length; i++) {
            total += this.passengers[i].food
        }
        return total
    }
}


// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);

