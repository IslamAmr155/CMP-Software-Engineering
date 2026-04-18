/*
Lab 5 Purpose
-------------
This lab helps students practice object-oriented design and clean code principles.
The given code works, but its design has several problems related to SOLID principles.

What students should do
-----------------------
1. Read the code and identify the design problems.
2. Refactor the code while keeping the same overall idea.
3. Apply:
   - Single Responsibility Principle (SRP)
   - Open/Closed Principle (OCP)
   - Dependency Inversion Principle (DIP)
   - Abstraction
   - Inheritance
   - Polymorphism
4. Make the code easier to extend when a new vehicle type or storage type is added.

Required outcome
----------------
- Create a general abstraction for vehicles.
- Replace type-based if/else logic with subclasses.
- Separate storage/saving responsibility from vehicle behavior.
- Make saving depend on an abstraction, not a concrete class.
- Demonstrate the solution using different vehicle types and storage types.
*/

class Database {
  save(data) {
    console.log(`Saving data to database: ${JSON.stringify(data)}`);
  }
}

class LocalFile {
  save(data) {
    console.log(`Saving data to local file: ${JSON.stringify(data)}`);
  }
}

class Vehicle {
  constructor(type, details) {
    this.type = type;
    this.details = details;
  }

  showDetails() {
    if (this.type === "Car") {
      console.log(
        `Car model: ${this.details.model}, daily rate: ${this.details.dailyRate}`,
      );
    } else if (this.type === "Bike") {
      console.log(
        `Bike model: ${this.details.model}, hourly rate: ${this.details.hourlyRate}`,
      );
    } else if (this.type === "Truck") {
      console.log(
        `Truck model: ${this.details.model}, per km rate: ${this.details.ratePerKm}`,
      );
    } else {
      console.log("Unsupported vehicle type");
    }
  }

  calculateRentalCost() {
    if (this.type === "Car") {
      return this.details.dailyRate * this.details.days;
    } else if (this.type === "Bike") {
      return this.details.hourlyRate * this.details.hours;
    } else if (this.type === "Truck") {
      return this.details.ratePerKm * this.details.distance;
    } else {
      console.log("Unsupported vehicle type");
      return 0;
    }
  }

  save() {
    const database = new Database();
    database.save(this.details);
  }
}

// Example usage
// Create:
// - a car rented for 3 days
// - a bike rented for 5 hours
// - a truck rented for 120 km
//
// Save:
// - car to database
// - bike to local file
// - truck to both database and local file

const localFile = new LocalFile();

const car = new Vehicle("Car", {
  model: "Toyota Corolla",
  dailyRate: 50,
  days: 3,
});
car.showDetails();
console.log(`Car rental cost: ${car.calculateRentalCost()}`);
car.save();

const bike = new Vehicle("Bike", { model: "Yamaha", hourlyRate: 10, hours: 5 });
bike.showDetails();
console.log(`Bike rental cost: ${bike.calculateRentalCost()}`);
localFile.save(bike.details);

const truck = new Vehicle("Truck", {
  model: "Volvo Truck",
  ratePerKm: 2,
  distance: 120,
});
truck.showDetails();
console.log(`Truck rental cost: ${truck.calculateRentalCost()}`);
truck.save();
localFile.save(truck.details);
