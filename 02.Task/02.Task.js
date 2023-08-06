// A Worker osztálynak nincs meghívva az ősosztály konstruktora.
// A Worker osztálynak a konstruktorában nem hívódik meg az ősosztály konstruktora a super() függvénnyel, így a this nem lesz inicializálva a name tulajdonság miatt.

class Person {
  constructor(name) {
    this.name = name;
  }
}

class Worker extends Person {
  constructor(name) {
    super(name); // Az ősosztály konstruktorának meghívása a super() függvénnyel
    this.created = Date.now();
  }
}

let w1 = new Worker("Kapimo");
alert(w1.name);

//   A super(name) hívással a Worker konstruktorban átadjuk a nevet az ősosztály konstruktorának, így a name tulajdonság megfelelően be lesz állítva a Worker példányon.
