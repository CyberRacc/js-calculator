const buttons = document.querySelectorAll(".calc-button");
const screenText = document.querySelector(".screen-text");

buttons.forEach((button) => button.addEventListener("click", function (e) {
    console.log(e);
    let buttonPressed = e.target.id;
    console.log(buttonPressed);
    screenText.textContent = `${buttonPressed}`;
}));

buttons.forEach((button) => button.addEventListener("mouseover", function (e) {
    button.classList.add("button-hover");
}));

buttons.forEach((button) => button.addEventListener("mouseout", function (e) {
    button.classList.remove("button-hover");
}));

let add = function(a, b) {
    return Number(a) + Number(b);
}

let subtract = function(a, b) {
    return Number(a) - Number(b);
}

let multiply = function(a, b) {
    return Number(a) * Number(b);
}

let divide = function(a, b) {
    return Number(a) / Number(b)
}

let operate = function(a, b, op) {
    if (op = "+") {
        add(a,b);
    } else if (op = "-") {
        subtract(a, b);
    } else if (op = "*") {
        multiply(a, b);
    } else {
        divide(a, b);
    }
}