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

    clearButton.addEventListener("mousedown", e => {
        clearButton.classList.add("button-click");
    });
    
    clearButton.addEventListener("mouseup", e => {
        clearButton.classList.remove("button-click");
    });
    
    clearButton.addEventListener("mouseout", e => {
        clearButton.classList.remove("button-hover");
        clearButton.classList.remove("button-click");
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

    window.addEventListener('keydown', e => {
        let key = e.key;
    
        // If the key pressed was a number or a decimal point
        if (!isNaN(key) || key === '.') {
            // Check if a decimal point is already present in the current number or the next number
            if (key === "." && ((currentOp === null && currentNum.includes(".")) || (currentOp !== null && nextNum.includes(".")))) {
                return;
            }
    
            // If no operation has been chosen yet, append the key to the current number
            if (currentOp === null) {
                currentNum += key;
            } else { // If an operation has been chosen, append the key to the next number
                nextNum += key;
            }
        } else if (key === "+" || key === "-" || key === "*" || key === "/") { // If the key pressed was an operator
            if (key === "/") key = "÷"; // Translate / into division symbol
    
            if (currentNum && currentOp && nextNum) {
                currentNum = operate();
                nextNum = "";
            }
            if (currentNum) {
                currentOp = key;
            }
        } else if (key === "Enter" || key === "=") { // If the equals key or the enter key was pressed
            if (currentNum && currentOp && nextNum) {
                currentNum = operate();
                nextNum = "";
                currentOp = null;
            } else if (currentNum && currentOp) {
                currentNum = operate();
                currentOp = null;
            }
        } else if (key === "Backspace") { // If the backspace key was pressed
            // Remove the last character from screenData, currentNum, and nextNum accordingly
            if (nextNum) {
                nextNum = nextNum.slice(0, -1);
            } else if (currentOp) {
                currentOp = null;
            } else if (currentNum) {
                currentNum = currentNum.slice(0, -1);
            }
            screenData = currentNum + (currentOp || '') + nextNum;
            screenText.textContent = screenData;
        } else if (key === "Escape") { // If the escape key was pressed
            screenData = "";
            currentNum = "";
            nextNum = "";
            currentOp = null;
            screenText.textContent = screenData;
        }
    
        // Update the screen data
        if (currentNum.length + nextNum.length < 16) {
            screenData = currentNum + (currentOp || '') + nextNum;
            screenText.textContent = screenData;
        }
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

    if (num1 === "" || operator === "" || num2 === "") {
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
                currentNum = "";
                nextNum = "";
                currentOp = null;
                screenData = "";
                screenText.textContent = "";
                return "";
            }
            break;
        default:
            return; // if the operator is not known, exit the function
    }

    if (result.toString().length > 16) {
        result = result.toFixed( 16 - (Math.floor(result) + "").length); // If result is too long, reduce decimal part to fit.
        result = parseFloat(result); // Removes traling zeros.
    }

    screenData = result.toString(); // Convert the result to a string to display.
    screenText.textContent = screenData; // update the screen with the result

    return result.toString();
}

eventListeners();
