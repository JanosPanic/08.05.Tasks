// Definiálunk egy Clock osztályt, amely az aktuális idő kijelzését végzi a megadott sablon alapján.
class Clock {
  constructor({ template }) {
    this.template = template; // A sablon, amelyet a dátum formázásához használunk.
  }

  // A render metódus a megadott sablon alapján formázza és kiírja az aktuális időt.
  render() {
    let date = new Date(); // Létrehozunk egy új Date objektumot, amely az aktuális időt tartalmazza.

    // Kiolvassuk az órát, percet és másodpercet, és 10-nél kisebb értékeknél hozzáadunk egy nullát az elejére.
    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;

    // A sablonban kicseréljük a "h", "m" és "s" karaktereket az aktuális órára, percre és másodpercre.
    let output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);

    // Kiírjuk az eredményt a konzolra.
    console.log(output);
  }

  // A stop metódus leállítja az időmérést.
  stop() {
    clearInterval(this.timer); // Az időzítő megszüntetése.
  }

  // A start metódus elindítja az időmérést és elkezdi a render metódust meghívni másodpercenként.
  start() {
    this.render(); // Azonnal kiírjuk az aktuális időt.
    this.timer = setInterval(() => this.render(), 1000); // Beállítjuk az időzítőt, ami másodpercenként hívja meg a render metódust.
  }
}

// Definiálunk egy CustomIntervalClock osztályt, amely továbbfejlesztett változata a Clock osztálynak, és tetszőleges időközönként frissíti az időt.
class CustomIntervalClock extends Clock {
  constructor({ template, interval }) {
    // A szülőosztály konstruktorát hívjuk, hogy inicializáljuk a template tulajdonságot.
    super({ template });
    this.interval = interval; // Az időköz, amelyen belül az időt frissítjük.
  }

  // Az új start metódus felülírja a szülőosztály start metódusát, és a saját időköz alapján frissíti az időt.
  start() {
    this.render(); // Azonnal kiírjuk az aktuális időt.
    this.timer = setInterval(() => this.render(), this.interval); // Beállítjuk az időzítőt, ami a megadott időközönként hívja meg a render metódust.
  }
}

// Példa használat:
// Létrehozunk egy új CustomIntervalClock objektumot és elindítjuk az időmérést másodpercenként.
const customClock = new CustomIntervalClock({
  template: "h:m:s",
  interval: 1000,
});
customClock.start();

// A DOMContentLoaded esemény lefutása után inicializáljuk az órát a HTML-ben megjelenített elemmel.
function initClock() {
  const clockContainer = document.getElementById("clock-container");

  // Létrehozunk egy új CustomIntervalClock objektumot és elindítjuk az időmérést másodpercenként.
  const customClock = new CustomIntervalClock({
    template: "h:m:s",
    interval: 1000,
  });

  // Az updateClock függvény másodpercenként frissíti az óra megjelenítését a HTML elemen.
  function updateClock() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const mins = date.getMinutes().toString().padStart(2, "0");
    const secs = date.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${mins}:${secs}`;
    clockContainer.textContent = timeString;
  }

  // Az óra elindítása és az updateClock függvény időzített hívása másodpercenként.
  customClock.start();
  setInterval(updateClock, 1000);
}

// Az initClock függvényt a dokumentum betöltődésekor hívjuk meg.
document.addEventListener("DOMContentLoaded", initClock);
