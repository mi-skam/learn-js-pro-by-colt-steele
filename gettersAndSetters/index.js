class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(newName) {
    const [firstName, lastName] = newName.trim().split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
