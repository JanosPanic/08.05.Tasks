// function Animal(name) {
//   this.name = name;
// }

// function Dog(name, breed) {
//   Animal.call(this, name);
//   this.breed = breed;
// }

// Dog.prototype = Object.create(Animal.prototype);
// Dog.prototype.constructor = Dog;

// const dog = new Dog("Buddy", "Golden Retriever");
// console.log(dog instanceof Animal); // true

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Az Animal konstruktorának meghívása a super() segítségével
    this.breed = breed;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog instanceof Animal); // true
