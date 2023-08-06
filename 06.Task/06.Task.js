// Definiálunk egy Node osztályt, ami egy láncolt lista elemeit reprezentálja.
class Node {
  constructor(value) {
    this.value = value; // Az elem értéke.
    this.next = null; // Az elem utáni elem referenciája, alapértelmezetten null.
  }
}

// Definiálunk egy LinkedList osztályt, ami a láncolt listát reprezentálja.
class LinkedList {
  constructor() {
    this.head = null; // A láncolt lista első elemének referenciája, alapértelmezetten null (üres lista).
  }

  // Az append metódus hozzáad egy új elemet a láncolt lista végéhez.
  append(value) {
    const newNode = new Node(value); // Létrehozunk egy új Node objektumot az adott értékkel.

    if (!this.head) {
      // Ha a láncolt lista üres, akkor a newNode lesz az első elem (head).
      this.head = newNode;
    } else {
      // Ha a láncolt lista nem üres, akkor az új elemet hozzáadjuk a láncolt lista végéhez.
      let current = this.head;
      while (current.next) {
        // Megkeressük a láncolt lista utolsó elemét.
        current = current.next;
      }
      current.next = newNode; // Az utolsó elem next attribútuma az új elem lesz.
    }
  }

  // Az insertAt metódus beszúr egy új elemet az adott indexre a láncolt listában.
  insertAt(index, value) {
    if (index === 0) {
      // Ha az index 0, akkor az új elem lesz az új feje a láncolt listának.
      const newNode = new Node(value);
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Ha az index nem 0, akkor az új elemet beszúrjuk az adott indexre.
      const newNode = new Node(value);
      let current = this.head;
      let prev = null;
      let i = 0;

      while (current && i < index) {
        // Megkeressük az adott indexű elemet és az azt megelőző elemet.
        prev = current;
        current = current.next;
        i++;
      }

      if (i === index) {
        // Ha megvan az adott indexű elem, akkor beillesztjük az új elemet a helyére.
        prev.next = newNode;
        newNode.next = current;
      } else {
        // Ha az index nem megfelelő, hibát jelezünk a konzolon.
        console.log("Invalid index.");
      }
    }
  }

  // A deleteAt metódus törli az adott indexű elemet a láncolt listából.
  deleteAt(index) {
    if (!this.head) {
      // Ha a láncolt lista üres, hibát jelezünk a konzolon.
      console.log("List is empty.");
      return;
    }

    if (index === 0) {
      // Ha az index 0, akkor az első elemet kell törölni, és a head átáll a következő elemre.
      this.head = this.head.next;
    } else {
      // Ha az index nem 0, akkor az adott indexű elemet töröljük ki a láncolt listából.
      let current = this.head;
      let prev = null;
      let i = 0;

      while (current && i < index) {
        // Megkeressük az adott indexű elemet és az azt megelőző elemet.
        prev = current;
        current = current.next;
        i++;
      }

      if (i === index) {
        // Ha megvan az adott indexű elem, akkor töröljük az elemet és az azt megelőző elemet kapcsoljuk össze az azt követő elemmel.
        prev.next = current.next;
      } else {
        // Ha az index nem megfelelő, hibát jelezünk a konzolon.
        console.log("Invalid index.");
      }
    }
  }

  // A getAt metódus visszaadja az adott indexű elem értékét.
  getAt(index) {
    let current = this.head;
    let i = 0;

    while (current && i < index) {
      // Megkeressük az adott indexű elemet.
      current = current.next;
      i++;
    }

    if (current && i === index) {
      // Ha megvan az adott indexű elem, akkor visszaadjuk az értékét.
      return current.value;
    } else {
      // Ha az index nem megfelelő, hibát jelezünk a konzolon.
      console.log("Invalid index.");
    }
  }

  // A display metódus kiírja a láncolt lista elemeit a konzolra egy szép formátumban.
  display() {
    let current = this.head;
    const result = [];

    while (current) {
      // Végigiterálunk a láncolt listán és az elemek értékét hozzáadjuk a result tömbhöz.
      result.push(current.value);
      current = current.next;
    }

    console.log(result.join(" -> ")); // Kiírjuk az elemeket, és közéjük -> jelet teszünk.
  }

  // A size metódus visszaadja a láncolt lista méretét (az elemek számát).
  size() {
    let current = this.head;
    let count = 0;

    while (current) {
      // Végigiterálunk a láncolt listán és megszámoljuk az elemeket.
      count++;
      current = current.next;
    }

    return count; // Visszaadjuk az elemek számát.
  }
}

// Tesztelés
const linkedList = new LinkedList(); // Létrehozunk egy új láncolt listát.
linkedList.append(10); // Hozzáadunk elemeket a láncolt listához.
linkedList.append(20);
linkedList.append(30);
linkedList.insertAt(1, 15); // Beszúrunk egy új elemet az adott indexre.
linkedList.display(); // Kiírjuk a láncolt lista elemeit: 10 -> 15 -> 20 -> 30
console.log(linkedList.getAt(2)); // Kiírjuk az adott indexű elem értékét: 20
console.log(linkedList.size()); // Kiírjuk a láncolt lista méretét: 4
linkedList.deleteAt(1); // Töröljük az adott indexű elemet.
linkedList.display(); // Kiírjuk a láncolt lista elemeit: 10 -> 20 -> 30
console.log(linkedList.size()); // Kiírjuk a láncolt lista méretét: 3
