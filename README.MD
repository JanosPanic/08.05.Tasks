## 1. TASK

### Készíts egy egyszerű játékot, amelyben különböző állatokat lehet etetni és hallgatni, hogy milyen hangot adnak ki. A játékban legyen egy alapvető állat osztály, amelynek van egy feed és egy makeSound metódusa. Az Animal osztályból származzanak le különböző állatok (pl. kutya, macska, madár), és mindegyiküknek legyen saját hangja és étrendje. Az állatok etetésével és meghallgatásával interaktálj a játékban

## 2. TASK

## Mi a hiba? Javítsd ki a kódot.

class Person {

constructor(name) {
this.name = name;
}

}

class Worker extends Person {
constructor(name) {
this.name = name;
this.created = Date.now();
}
}

let w1 = new Worker("Kapimo"); // - Itt a hiba: Error: this is not defined
alert(w1.name);

## 3. TASK

### Mi a hiba? Javítsd ki a kódot.

class Animal {
constructor(name) {
this.name = name;
}
}

function Dog(name, breed) {
Animal.call(this, name);
this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog instanceof Animal);

## 4. TASK

### Készíts egy állatokat reprezentáló osztály hierarchiát az objektumorientált programozás elveinek alkalmazásával. Az osztály hierarchia alapja az "Animal" osztály, amely egy absztrakt osztály. Az "Animal" osztály tartalmazza az állatok közös tulajdonságait, mint például a nevet és a kort, valamint egy absztrakt hangotAd metódust, amelyet a leszármaztatott osztályoknak kell implementálni. Hozz létre legalább két leszármaztatott osztályt, amelyek az "Animal" osztályból származnak, például "Dog" és "Cat" osztályok. Ezekben a leszármaztatott osztályokban implementáld a hangotAd metódust, amely minden állat típusához különböző hangot ad vissza. Az "Animal" osztályban definiálj egy getInfo metódust, amely visszaadja az állat adatait, például "Név: X, Kor: Y év". A leszármaztatott osztályokban ezt a metódust bővítsd ki az osztály saját adattagjaival, amelyek az állatokra jellemző tulajdonságokat tárolják.

// Az állatok hierarchiájának tesztelése
const dog = new Kutya("Bodri", 5, "Vizsla");
const cat = new Macska("Cirmi", 3, "Fekete-fehér");

console.log(dog.getInfo()); // Output: "Név: Bodri, Kor: 5 év, Fajta: Vizsla"
console.log(dog.hangotAd()); // Output: "Vau vau!"

console.log(cat.getInfo()); // Output: "Név: Cirmi, Kor: 3 év, Szín: Fekete-fehér"
console.log(cat.hangotAd()); // Output: "Miau miau!"

## 5. TASK

### Az alábbi órát megvalósító kódban másodpercenként növeljük az időt. Csinálj egy kiterjesztést (írj egy új osztályt ami örökli ezt) ahol be lehet állítani, hogy milyen időközönként frissítse a kiírást.

class Clock {
constructor({ template }) {
this.template = template;
}

render() {
let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);

}

stop() {
clearInterval(this.timer);
}

start() {
this.render();
this.timer = setInterval(() => this.render(), 1000);
}
}

## 6. TASK

### Hozz létre egy láncolt lista osztályt, amely lehetővé teszi egyszerű adatelemek tárolását és kezelését. A láncolt lista egy olyan adatszerkezet, amely egymáshoz kapcsolt csomópontokból áll. Minden csomópont tárol egy értéket (adatot) és egy mutatót a következő csomópontra.

A láncolt lista osztálynak a következő metódusokat kell tartalmaznia:

append(value): Ez a metódus egy új csomópontot ad hozzá a láncolt listához, amely a megadott value értéket tartalmazza. Az új csomópontot a lista végére kell illeszteni.
insertAt(index, value): Ez a metódus egy új csomópontot szúr be a láncolt listába a megadott index pozícióra. Az index azt mutatja, hányadik helyre kell beszúrni az új csomópontot.
deleteAt(index): Ez a metódus törli a láncolt lista index pozíciójú csomópontját.
getAt(index): Ez a metódus visszaadja a láncolt lista index pozíciójú csomópontjának értékét.
display(): Ez a metódus kiírja a láncolt lista összes elemét a konzolra.
size(): Ez a metódus visszaadja a láncolt lista méretét, azaz hány csomópontot tartalmaz.
A láncolt lista osztály használatakor a felhasználónak lehetősége kell legyen hozzáadni, törölni, lekérdezni és listázni az elemeket.

const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);
linkedList.insertAt(1, 15);
linkedList.display(); // Output: 10 -> 15 -> 20 -> 30
console.log(linkedList.getAt(2)); // Output: 20
console.log(linkedList.size()); // Output: 4
linkedList.deleteAt(1);
linkedList.display(); // Output: 10 -> 20 -> 30
console.log(linkedList.size()); // Output: 3

## 7. TASK

## Készíts egy aknakereső játékot, amelyben egy n x m méretű játéktáblán elrejtett aknákat kell megtalálni. A játék kezdetén véletlenszerűen elhelyezünk néhány aknát a játéktáblán, majd a játékos kattintásokkal próbálja meg kinyitni a mezőket. A mezők lehetnek aknák vagy számok, amelyek azt mutatják, hány akna található a mező szomszédságában (fenti, alsó, bal oldali, jobb oldali és diagonális mezők).

Az aknakereső osztálynak a következő metódusokat kell tartalmaznia:

initializeBoard(rows, cols, numMines): Ez a metódus inicializálja a játéktáblát, beállítja a sorok és oszlopok számát, és véletlenszerűen elhelyezi az aknákat a megadott szám alapján.
#openCell(row, col): Ez a metódus megnyitja a kiválasztott mezőt, és ellenőrzi, hogy akna-e vagy sem. Ha aknát talál, a játék véget ér, különben kiszámolja és megjeleníti a mező szomszédos aknáinak számát.
#displayBoard(): Ez a privát metódus megjeleníti a játéktáblát a konzolon. Ha egy mezőt már megnyitottak, megjeleníti a szomszédos aknák számát vagy az "M" betűt, ha az akna.
startGame(): Ez a metódus elindít egy végtelen ciklust ahol minden ciklusban bekérjük a kiválasztott mezőt, meghívjuk az #openCell metódust, ellenőrizzük hogy akna-e, ha akna akkor vége a játéknak, ha nem akkor kirajzoljuk a táblát, #displayBoard(), majd kezdjük az új ciklust.
A játékos a sor és oszlop indexeket használja a mezők kiválasztásához, és a játék folyamata során a játék táblája és állapota folyamatosan megjelenik a konzolon.

A játékban a mezőket próbáld meg egy osztály hierarchiával megvalósítani. pl. Field -- MineField, ClearField. Ezek ismerjék a szomszédaikat és abból tudják számolni a környező MineField-ek számát, ill. jelzik ha felrobbantak.

class Minesweeper {
// Implementáció a feladatban megadott metódusokkal és logikával
}

const game = new Minesweeper();
game.initializeBoard(6, 6, 8);
game.startGame();

// A játékos lépései
Mit lépsz?
2,3

// A játék folytatódik...
Mit lépsz?
3,3

// A játék folytatódik...
Mit lépsz?
3,2

// A játék folytatódik...
Mit lépsz?
2,2

Vége a játéknak...
