const buttons = document.querySelectorAll(".calc-button");
const screenText = document.querySelector(".screen-text");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#backspace");

let screenData = "";
let currentNum = "";
let nextNum = "";
let currentOp = null;

let eventListeners = function() {
    
    buttons.forEach((button) => button.addEventListener("click", e => {
    
        // Define variable equal to the "data-num" attribute from HTML.
        let buttonPressed = e.target.dataset.num;
    
        // Check if the buttonPressed is equal to a number or a decimal point.
        if (!isNaN(buttonPressed) || buttonPressed === ".") {
    
            if (buttonPressed === ".") {
                if ((currentOp === null && currentNum.includes(".")) || (currentOp !== null && nextNum.includes("."))) {
                    return; // if the current number already has a dot, ignore the button press
                }
            }
    
            // Checks state of currentOp, if it's null; no operation chosen yet
            // so it adds the buttonPressed to the current number.
            if (currentOp === null) {
                currentNum += buttonPressed;
            } else { // If the currentOp exists, the next button pressed is added to nextNum.
                nextNum += buttonPressed;
            }
    
        } else { // Runs if buttonPressed was not a number or decimal point, therefor an op.
            if (currentNum && currentOp && nextNum) {
                currentNum = operate();
                nextNum = "";
            }
            if (currentNum) {
                currentOp = buttonPressed;
            }
        }
    
        // Checks if the total length of currentNum & nextNum is less than 16 before
        // adding to screenData
        if (currentNum.length + nextNum.length < 16) {
            screenData = currentNum + (currentOp || '') + nextNum;
            screenText.textContent = screenData;
        }
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
        if (currentNum && currentOp && nextNum) {
            currentNum = operate();
            nextNum = "";
            currentOp = null;
        } else if (currentNum && currentOp) {
            operate();
            currentOp = null;
        }
    });
    
    clearButton.addEventListener("click", e => {
        screenData = "";
        screenData = "";
        currentNum = "";
        nextNum = "";
        currentOp = null;
        screenText.textContent = screenData;
    });
}

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
    
    const num1 = Number(currentNum);
    const operator = currentOp;
    const num2 = Number(nextNum);

    let result;

    if (!num1 || !operator || !num2) {
        return;
    }

    if (num1 === null || num1 === undefined || operator === null || operator === undefined || num2 === null || num2 === undefined) {
        return;
    }

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
    screenData = result.toString(); // Convert the result to a string to display.
    screenText.textContent = screenData; // update the screen with the result

    return result.toString();
}

eventListeners();
