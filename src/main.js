// Add your JavaScript here
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.percentage();
    }
    //clear function
    clear() {
        this.currentDisplay = '';
        this.previousDisplay = '';
        this.operation = undefined;
    }
    //delete function
    delete() {
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentDisplay.includes('.')) return;
        this.currentDisplay =
            this.currentDisplay.toString() + number.toString();
    }
    //choose operation Function
    chooseOperation(operation) {
        if (this.currentDisplay === '') return;
        if (this.previousDisplay !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousDisplay = this.currentDisplay;
        this.currentDisplay = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousDisplay);
        const current = parseFloat(this.currentDisplay);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentDisplay = computation;
        this.operation = undefined;
        this.previousDisplay = '';
    }
    updateDisplay() {
        const maxLength = 14;

        if (this.currentDisplay.length > maxLength) {
            return;
        }
        this.currentOperandTextElement.innerText = this.currentDisplay;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousDisplay}${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
    percentage(_variable) {
        if (this.currentDisplay !== '') {
            this.currentDisplay = this.currentDisplay / 100;
        }
        if (this.previousDisplay !== '') {
            this.compute();
        }
    }
}

// select all the Data from the DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const percentageButtons = document.querySelector('[data-percentage]');

const allClearButtons = document.querySelector('[data-all-clear]');

const previousOperandTextElement = document.querySelector(
    '[data-previous-display'
);
const currentOperandTextElement = document.querySelector(
    '[data-current-display'
);

// initialization of new calculator
const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);
// eah time click on a data number attribute get the inner text
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
// eah time click on a data Operation attribute get the inner text
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
//clear Button call
allClearButtons.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

//delete Button call
deleteButtons.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

//Math Button call
equalsButtons.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});
//percentage button call
percentageButtons.addEventListener('click', () => {
    calculator.percentage('%');
    calculator.updateDisplay();
});
