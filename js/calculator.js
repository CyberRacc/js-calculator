const buttons = document.querySelectorAll(".calc-button");
const screenText = document.querySelector(".screen-text");

buttons.forEach((button) => button.addEventListener("click", e => {
    let buttonPressed = e.target.dataset.num;
    screenText.textContent = `${buttonPressed}`;
}));

buttons.forEach((button) => button.addEventListener("mouseover", e => {
    button.classList.add("button-hover");
}));

buttons.forEach((button) => button.addEventListener("mouseout", e => {
    button.classList.remove("button-hover");
    button.classList.remove("button-click");
}));

buttons.forEach((button) => button.addEventListener("mousedown", e => {
    button.classList.add("button-click")
}))

buttons.forEach((button) => button.addEventListener("mouseup", e => {
    button.classList.remove("button-click")
}))

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