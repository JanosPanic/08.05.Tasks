class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `Név: ${this.name}, Kor: ${this.age} év`;
  }

  hangotAd() {
    throw new Error(
      "A hangotAd metódust a leszármaztatott osztályokban kell implementálni!"
    );
  }
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  getInfo() {
    return `${super.getInfo()}, Fajta: ${this.breed}`;
  }

  hangotAd() {
    return "Vau vau!";
  }
}

class Cat extends Animal {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }

  getInfo() {
    return `${super.getInfo()}, Szín: ${this.color}`;
  }

  hangotAd() {
    return "Miau miau!";
  }
}

// Az állatok hierarchiájának tesztelése
const dog = new Dog("Bodri", 5, "Vizsla");
const cat = new Cat("Cirmi", 3, "Fekete-fehér");

console.log(dog.getInfo()); // Output: "Név: Bodri, Kor: 5 év, Fajta: Vizsla"
console.log(dog.hangotAd()); // Output: "Vau vau!"

console.log(cat.getInfo()); // Output: "Név: Cirmi, Kor: 3 év, Szín: Fekete-fehér"
console.log(cat.hangotAd()); // Output: "Miau miau!"
