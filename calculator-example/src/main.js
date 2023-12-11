const { invoke } = window.__TAURI__.tauri;


let result = 0;

let operator = "";

let has_decimal = false;

let previousExpression = "0";
let expression = "0";

// Function to update display
function updateDisplay(){
    document.getElementById("display").textContent = expression;
}

// Function to clear expression
function clearExpression(){
    // Reset everything
    result = 0;
    operator = "";
    has_decimal = false;
    previousExpression = "";
    expression = "0";
    updateDisplay();
}

function appendToExpression(num){

    if ((expression ==="0" || expression==="") && num==='0'){
        return;
    }

    if (expression === "0"){
        expression = "";
    }

    expression+=num;
    updateDisplay();
}

function useOperator(op){
    operator = op;
    if (previousExpression === "0"){
        previousExpression = expression;
        expression = "0";
        has_decimal = false;
    }
    updateDisplay();
}

// Function to Calculate Result

async function calculate(){

    // Works only if there is operator
    if (operator===""){return;}

    result = (await invoke('calculate_result', { expression1: previousExpression, expression2:expression, operator: operator })).toFixed(5);

    // Show result rounded to at max 5 decimal digits
    document.getElementById("display").textContent = result;

    // Set previous expression to result
    previousExpression = result;

    // Reset the data
    result = 0;
    operator = "";
    has_decimal = false;
    expression = "0";
}

function addDecimal(){
    if (!has_decimal){
        expression+='.';
    }
    updateDisplay();
}


// Add the keyboard functionality

function handleKeyDown(event) {
    const key = event.key;
    switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0': appendToExpression(key); break;

        case '+':
        case '-':
        case '*':
        case '/':
        case '.': useOperator(key); break;

        case 'Enter': calculate().then();break;

        case 'Escape': clearExpression();break;
    }
}