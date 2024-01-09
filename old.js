const pet = { species: "Dog", name: "Elton", age: 1.5 };

// all keys get stringified

pet.sayH = function () {
  return "WOOF WOOF!!!";
};

// First step, get functions
function getTriangleArea(a, b) {
  return (a * b) / 2;
}

function getTriangleHypotenuse(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}

// second step, move them to be part of an object
let myTri = {
  a: 3,
  b: 4,
  getArea: function () {
    return (this.a * this.b) / 2;
  },
  getHypotenuse: function () {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  },
};

// alternative third step, create a function that returns an object
function createTri(a, b) {
  return {
    a,
    b,
    getArea: function () {
      return (this.a * this.b) / 2;
    },
    getHypotenuse: function () {
      return Math.sqrt(this.a ** 2 + this.b ** 2);
    },
  };
}

let triangle1 = createTri(3, 4);
let triangle2 = createTri(9, 2);

// third step, migrate them to classes
// naming scheme UpperCamelCase

class Triangle {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getArea() {
    return (this.a * this.b) / 2;
  }

  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
}

let triangle3 = new Triangle(3, 4);
let triangle4 = new Triangle(9, 2);

// improve the constructor with data validation

class Triangle2 {
  constructor(a, b) {
    if (!Number.isFinite(a) || a <= 0) throw new Error(`Invalid a: ${a}`);
    if (!Number.isFinite(b) || b <= 0) throw new Error(`Invalid b: ${b}`);
    this.a = a;
    this.b = b;
  }

  getArea() {
    return (this.a * this.b) / 2;
  }

  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
}

let triangle5 = new Triangle2(3, 4);
let triangle6 = new Triangle2(9, 2);

class BankAccount {
  constructor(accountHolder, accountNumber, balance = 0) {
    if (!accountHolder) throw new Error("Account holder is required.");
    if (!accountNumber) throw new Error("Account number is required.");
    this.holder = accountHolder;
    this.number = accountNumber;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`new balance: $${this.balance}`);
  }

  withdraw(amount) {
    if (this.balance - amount < 0)
      throw new Error(`Not enough funds to withdraw: ${amount}`);
    this.balance -= amount;
    console.log(`new balance: $${this.balance}`);
  }
}

class ShyTriangle extends Triangle2 {
  describe() {
    return "(runs and hides)";
  }
}

class BankAccount {
  constructor(accountHolder, accountNumber, balance = 0) {
    if (!accountHolder) throw new Error("Account holder is required.");
    if (!accountNumber) throw new Error("Account number is required.");
    this.holder = accountHolder;
    this.number = accountNumber;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`new balance: $${this.balance}`);
  }

  withdraw(amount) {
    if (this.balance - amount < 0)
      throw new Error(`Not enough funds to withdraw: ${amount}`);
    this.balance -= amount;
    console.log(`new balance: $${this.balance}`);
  }
}

class ShyTriangle extends Triangle2 {
  describe() {
    return "(runs and hides)";
  }
}

// static properties and  static methods

// in static methods "this" refers to the class
// in non-static methods "this" refers to the methods

class Cat {
  // only lives on Cat, like Cat.specie
  static specie = "felis catus";

  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }
  static meow() {
    return "MEOW MEOW MEOW";
  }

  static registerRandomCat() {
    function choice(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }
    const names = [
      "Muffin",
      "Biscuit",
      "Sleepy",
      "Dodo",
      "Princess Butterface",
    ];

    return new Cat(choice(names), "unknown");
  }
}

class MyMath {
  static add(a, b) {
    return a + b;
  }
  static multiply(a, b) {
    return a * b;
  }
}

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(nameInput) {
    const [firstName, lastName] = nameInput.trim().split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class hideItOld {
  constructor(permissionFlag) {
    this._internalPermissions = permissionFlag;
  }
  status() {
    console.log(this._internalPermissions);
  }
}

class hideItNew {
  #internalPermissions; // required!
  constructor(permissionFlag) {
    this.#internalPermissions = permissionFlag;
  }
  status() {
    console.log(this.#internalPermissions);
  }
}

const conan = {
  name: "Conan",
  city: "Los Angeles",
  sing: function () {
    console.log("THIS is: ", this);
    console.log(`${this.name} sings LA LA LA`);
  },
};

const btn = document.querySelector("#clickMe");

btn.addEventListener("click", conan.sing.bind(conan));

class Counter {
  constructor(counter, increment) {
    this.counter = counter;
    this.increment = increment;
  }

  go() {
    setInterval(this.#incrementAndPrint.bind(this), 1000);
  }

  #incrementAndPrint() {
    this.counter += this.increment;
    console.log(this.counter);
  }
}

function House() {
  this.rooms = 4;
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

fetch(`${BASE_URL}/1`).then((data) => console.log(data));

async function hello() {
  return "Hello async";
}

function getUrl(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error("Request failed with status: " + xhr.status));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Network error occurred"));
    };
    xhr.send();
  });
}

function wait(durationMs) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("waited :-)");
    }, durationMs);
  });
}

async function waitDemo() {
  console.log("Hi");
  const result = await wait(2000);
  console.log(result);
}

function fakeApi(user = "nick") {
  const someData = [
    {
      user: "nick",
      id: "2432",
      created: "2923-2-1",
    },

    {
      user: "alfred",
      id: "1111",
      created: "1922-11-1",
    },
  ];

  return JSON.stringify(...someData.filter((u) => u.user == user));
}

function fakeApi(user = "nick") {
  const someData = [
    {
      user: "nick",
      id: "2432",
      created: "2923-2-1",
    },

    {
      user: "alfred",
      id: "1111",
      created: "1922-11-1",
    },
  ];

  console.log(JSON.stringify(...someData.filter((u) => u.user == user)));
}

function debounce(cb, delay) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const debouncedFakeApi = debounce(fakeApi, 500);

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", (evt) => {
  debouncedFakeApi(evt.target.value);
});
