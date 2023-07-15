const buttons = document.querySelectorAll(".calc-button");
const screenText = document.querySelector(".screen-text");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#backspace");

let screenData = "";

buttons.forEach((button) => button.addEventListener("click", e => {
    let buttonPressed = e.target.dataset.num;
    screenData += buttonPressed;
    screenText.textContent = screenData;
}));

deleteButton.addEventListener("click", e => {
    screenArray = screenData.split("");
    screenArray.splice(screenArray.length - 1, 1);
    screenData = screenArray.join("");
    screenText.textContent = screenData;
});

buttons.forEach((button) => button.addEventListener("mouseover", e => {
    button.classList.add("button-hover");
}));

buttons.forEach((button) => button.addEventListener("mouseout", e => {
    button.classList.remove("button-hover");
    button.classList.remove("button-click");
}));

buttons.forEach((button) => button.addEventListener("mousedown", e => {
    button.classList.add("button-click");
}));

buttons.forEach((button) => button.addEventListener("mouseup", e => {
    button.classList.remove("button-click");
}));

equalsButton.addEventListener("mousedown", e => {
    equalsButton.classList.add("button-click");
});

equalsButton.addEventListener("mouseup", e => {
    equalsButton.classList.remove("button-click");
});

equalsButton.addEventListener("mouseout", e => {
    equalsButton.classList.remove("button-hover");
    equalsButton.classList.remove("button-click");
});

deleteButton.addEventListener("mousedown", e => {
    deleteButton.classList.add("button-click");
});

deleteButton.addEventListener("mouseup", e => {
    deleteButton.classList.remove("button-click");
});

deleteButton.addEventListener("mouseout", e => {
    deleteButton.classList.remove("button-hover");
    deleteButton.classList.remove("button-click");
});

equalsButton.addEventListener("click", e => {
    operate();
});

clearButton.addEventListener("click", e => {
    screenData = "";
    screenText.textContent = screenData;
})

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

let operate = function() {

    const input = screenData;

    let components = input.match(/[\d.]+|[+/*÷-]/g);
    
    if (components && components.length === 3) { // ensure we have three components

        let num1 = Number(components[0]);
        let operator = components[1];
        let num2 = Number(components[2]);

        let result;

        switch(operator) {
            case "+":
                result = add(num1, num2);
                break;
            case "-":
                result = subtract(num1, num2);
                break;
            case "*":
                result = multiply(num1, num2);
                break;
            case "÷":
                if(num2 !== 0) {
                    result = divide(num1, num2);
                } else {
                    alert("You cannot divide by zero!");
                    return;
                }
                break;
            default:
                return; // if the operator is not known, exit the function
        }

        screenData = result.toString();
        screenText.textContent = screenData; // update the screen with the result
    }
}
