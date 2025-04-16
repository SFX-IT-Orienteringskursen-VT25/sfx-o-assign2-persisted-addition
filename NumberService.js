export class NumberService{
    constructor(localStorage){
    this.localStorage=localStorage;
    this.key = 'numbers';
    this.enteredNumbers= JSON.parse(localStorage.getItem(this.key)) || [];
    this.sum = this.enteredNumbers.reduce((acc, num) => acc + num, 0);
    }

addNumber(number){
if(!Number.isInteger(number)){
    return;
}
this.enteredNumbers.push(number);
this.sum += number;
this.localStorage.setItem(this.key, JSON.stringify(this.enteredNumbers));

}
getNumbers(){
    return this.enteredNumbers;
}

getSum(){
    return this.sum;
}

}