// Globális változók az állattípus és az állatinterakció tárolására.
let selectedAnimalType = null;
let selectedInteraction = null;

// Az Animal osztály, amelynek két metódusa van: feed és makeSound.
class Animal {
  constructor(name, sound, food) {
    this.name = name;
    this.sound = sound;
    this.food = food;
  }

  // A feed metódus kiírja, hogy az adott állatot mivel etették meg.
  feed() {
    writeToOutput(
      `${this.name} kedvenc ételével, a(z) ${this.food}-val eteted.`
    );
  }

  // A makeSound metódus kiírja az adott állat hangját.
  makeSound() {
    writeToOutput(`${this.name} hangja: ${this.sound}.`);
  }
}

// Az állat típusokhoz tartozó leszármaztatott osztályok (Dog, Cat, Bird), amelyek a szülő Animal osztályból származnak.
class Dog extends Animal {
  constructor(name) {
    // A szülő osztály konstruktorának meghívása a super kulcsszóval.
    // Itt a playAnimalSound() függvény eredményét adjuk át a sound paraméternek, és a "csirke" értéket adjuk át a food paraméternek.
    super(name, playAnimalSound(), "csirke");
  }
}

class Cat extends Animal {
  constructor(name) {
    // Hasonlóan a Dog osztályhoz, itt is a megfelelő értékeket adjuk át a szülő osztály konstruktorának.
    super(name, playAnimalSound(), "hal");
  }
}

class Bird extends Animal {
  constructor(name) {
    // Hasonlóan a Dog és Cat osztályokhoz, itt is a megfelelő értékeket adjuk át a szülő osztály konstruktorának.
    super(name, playAnimalSound(), "magvak");
  }
}

// A writeToOutput függvény létrehoz egy új bekezdést az output elemen belül és beállítja a szöveget a kapott üzenetre.
function writeToOutput(message) {
  const output = document.getElementById("output");
  const paragraph = document.createElement("p");
  paragraph.textContent = message;
  output.appendChild(paragraph);
}

// Az állat típus kiválasztását kezelő függvény.
function selectAnimal(animalType) {
  selectedAnimalType = animalType;
  document.getElementById("selectedAnimal").textContent = animalType;
}

// Az állatinterakció kiválasztását kezelő függvény.
function selectInteraction(interactionType) {
  selectedInteraction = interactionType;
}

// Az állat hangjának lejátszását kezelő függvény.
function playAnimalSound() {
  if (!selectedAnimalType) {
    writeToOutput("Nem választottál állatot!");
    return;
  }

  // Az állatok hangjainak tárolása egy objektumban.
  const animalSounds = {
    kutya: "dogSound",
    macska: "catSound",
    madár: "birdSound",
  };

  // Az aktuális állat típushoz tartozó hang azonosítójának megszerzése az animalSounds objektumból.
  const soundId = animalSounds[selectedAnimalType];
  if (!soundId) {
    writeToOutput("Nem megfelelő állatot választottál.");
    return;
  }
  // Az audió elem lejátszása a kiválasztott hanggal, csak akkor, ha a "Hang lejátszása" gombra kattintottál.
  if (selectedInteraction === "hang") {
    const audio = document.getElementById(soundId);
    audio.currentTime = 0;
    audio.play();
  }
}

// Az állatokkal való interakciót kezelő fő függvény.
async function startGame() {
  if (!selectedAnimalType) {
    writeToOutput("Nem választottál állatot!");
    return;
  }

  if (!selectedInteraction) {
    writeToOutput("Nem választottál állatinterakciót!");
    return;
  }

  let animal;

  // A kiválasztott állat típus alapján létrehozunk egy megfelelő állat objektumot.
  switch (selectedAnimalType) {
    case "kutya":
      animal = new Dog("Bodri");
      break;
    case "macska":
      animal = new Cat("Cirmi");
      break;
    case "madár":
      animal = new Bird("Pityu");
      break;
    default:
      writeToOutput("Nem megfelelő állatot választottál.");
      return;
  }

  // Az állat típus és az állatinterakció kiíratása.
  writeToOutput(`Kiválasztott állat: ${selectedAnimalType}`);
  writeToOutput(`Kiválasztott interakció: ${selectedInteraction}`);

  // Az állatinterakció függvények meghívása az adott állattípusra.
  if (selectedInteraction === "etet") {
    animal.feed();
  } else if (selectedInteraction === "hang") {
    playAnimalSound();
  }

  writeToOutput("Viszontlátásra!");
}
