const buttons = document.querySelectorAll(".calc-button");
const screenText = document.querySelector(".screen-text");

buttons.forEach((button) => button.addEventListener("click", function (e) {
    console.log(e);
    let numberPressed = e.target.id;
    console.log(numberPressed);
    screenText.textContent = `${numberPressed}`;
}));

buttons.forEach((button) => button.addEventListener("mouseover", function (e) {
    button.classList.add("button-hover");
}));

buttons.forEach((button) => button.addEventListener("mouseout", function (e) {
    button.classList.remove("button-hover");
}));