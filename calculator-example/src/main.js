const { invoke } = window.__TAURI__.tauri;


let result = 0;

let operator = "";

let has_decimal = false;

let previousExpression = "";
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
    if (expression === "0"){
        expression = "";
    }
    expression+=num;
    updateDisplay();
}

function useOperator(op){
    operator = op;
    previousExpression = expression;
    expression = "0";
    has_decimal = false;
    updateDisplay();
}

function addDecimal(){
    if (!has_decimal){
        expression+='.';
    }
    updateDisplay();
}


