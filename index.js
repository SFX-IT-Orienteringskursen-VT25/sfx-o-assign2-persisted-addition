function saveValue(data) {
    if( data.includes("+")) {
            localStorage.setItem("numbers", data);
    } else {
        localStorage.setItem("sum", data);
    }
}

function getValue(item) {
    const value = localStorage.getItem(item);

    return value
}

function parseInteger(a){
    if (typeof a !== "number") {
        a = parseInt(a, 10); 
        return  a;
    } return a
}

function sumElements(a) {
    let count =+ parseInteger(a);
    return  count;
}

module.exports = sumElements, saveValue, getValue, parseInteger;



