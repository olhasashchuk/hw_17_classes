class BankAccount {
    constructor(sumAccount) {
        this.balance = sumAccount;
        this.getBalance();
    }
    getBalance () {
        return this.balance;
    }
    deposit(number) {
        this.balance += number;
        return this.balance;
    }
    withdraw(number) {
        this.balance -= number;
        return this.balance;
    }
}

const account1 = new BankAccount(1000);
console.log(account1.getBalance()); // 1000
account1.deposit(500);
console.log(account1.getBalance()); // 1500
account1.withdraw(200);
console.log(account1.getBalance()); // 1300

