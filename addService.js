export function readInteger(input) {
    let numbers = JSON.parse(localStorage.getItem("numbers")) || [];

    numbers.push(input);

    const sum = numbers.reduce((a, b) => a + b, 0);

    localStorage.setItem("numbers", JSON.stringify(numbers));

    return { numbers, sum };
}