const currentOperandElement = document.getElementById("current-operand");
const previousOperandElement = document.getElementById("previous-operand");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');

let currentOperand = "";
let previousOperand = "";
let operation = undefined;

// Display Update

function updateDisplay() {
    currentOperandElement.textContent = currentOperand || "0";

    if (operation != null) {
        previousOperandElement.textContent =
            `${previousOperand} ${getDisplayOperator(operation)}`;
    } else {
        previousOperandElement.textContent = "";
    }
}


// Number Input

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) {
        return;
    }

    if (number === "." && currentOperand === "") {
        currentOperand = "0";
    }

    currentOperand += number;

    updateDisplay();
}



// Choose Operation

function chooseOperation(selectedOperation) {
    if (currentOperand === "" && previousOperand === "") {
        return;
    }

    if (currentOperand === "" && operation !== undefined) {
        operation = selectedOperation;
        updateDisplay();
        return;
    }

    if (previousOperand !== "") {
        calculate();
    }

    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = "";

    updateDisplay();
}


// -------------------------
// Calculate Result
// -------------------------
function calculate() {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentOperand = "Error";
                previousOperand = "";
                operation = undefined;
                updateDisplay();
                return;
            }

            result = previous / current;
            break;

        default:
            return;
    }

    currentOperand = roundResult(result).toString();
    previousOperand = "";
    operation = undefined;

    updateDisplay();
}


// Clear Calculator

function clearCalculator() {
    currentOperand = "";
    previousOperand = "";
    operation = undefined;

    updateDisplay();
}


// Delete Last Character

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);

    updateDisplay();
}


// Round Long Decimal Results

function roundResult(number) {
    return Math.round((number + Number.EPSILON) * 100000000) / 100000000;
}


// Display Operator

function getDisplayOperator(operator) {
    switch (operator) {
        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return "";
    }
}


// -------------------------
// Number Buttons
// -------------------------
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
    });
});


// -------------------------
// Operator Buttons
// -------------------------
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        chooseOperation(button.dataset.operator);
    });
});

// Equals Button

equalsButton.addEventListener("click", () => {
    calculate();
});


// Clear Button

clearButton.addEventListener("click", () => {
    clearCalculator();
});



// Delete Button

deleteButton.addEventListener("click", () => {
    deleteNumber();
});



// Keyboard Support

document.addEventListener("keydown", event => {

    if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
        appendNumber(event.key);
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperation(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }
});


// Initial Display
updateDisplay();