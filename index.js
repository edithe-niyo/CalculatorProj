const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);

}

function inputDecimal(dot) {

    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }


    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {

    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;

    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        // calculator.displayValue = String(result);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {

    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;

}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function invalidKey() {
    var context = new AudioContext();
    var osc440 = context.createOscillator();
    osc440.frequency.value = 440;
    osc440.connect(context.destination);
    osc440.start();
    osc440.stop(context.currentTime + 0.25);
    document.getElementById("messageinv").textContent = "Invalid key";
    setTimeout(() => (document.getElementById("messageinv").innerHTML = ""), 3000);
}

// function screenKeyboard() {
//     if (window.addEventListener('keypress', (event))) {
//         const keys = document.querySelector('.calculator-keys');
//         keys.addEventListener('click', (event));
//     }
// }

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
updateDisplay()

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();

});

window.addEventListener('keypress', (event) => {
    const { key } = event;
    let buttons = null

    if (key) {
        const value = document.querySelector('.calculator-screen');

        const button = document.getElementsByTagName('button');
        for (let i = 0; i < button.length; i++) {
            if (button[i].getAttribute('value').toString() === key.toString()) {
                buttons = button[i];
            }
        }

        if (buttons) {
            buttons.style.backgroundColor = "#18777a";
            buttons.style.color = "black"
            setTimeout(() => {
                buttons.style.backgroundColor = "transparent";
                buttons.style.color = "black";
            }, 500);
        }

    }

    if (['+', '-', '*', '/', '='].includes(key)) {
        handleOperator(key);
        updateDisplay();
        return;
    }

    if (['.', ','].includes(key)) {
        inputDecimal('.');
        updateDisplay();
        return;
    }

    if (['c', 'C'].includes(key)) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
        inputDigit(key);
        updateDisplay();
        return;
    }
    invalidKey();


});