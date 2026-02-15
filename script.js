const box = document.getElementById("box");
const historyBox = document.getElementById("last_operation_history");

let current = "0";
let previous = null;
let operator = null;
let resetNext = false;

function updateDisplay(){
    box.innerText = current;
}

function button_number(value){

    value = value.toString();

    if (!isNaN(value) || value === "."){
        inputNumber(value);
        return;
    }

    if (["+", "-", "*", "/"].includes(value)){
        selectOperator(value);
        return;
    }

    if (value === "="){
        calculate();
        return;
    }
}

function inputNumber(num){

    if (resetNext){
        current = num === "." ? "0." : num;
        resetNext = false;
        updateDisplay();
        return;
    }

    if (num === "." && current.includes(".")) return;

    if (current === "0" && num !== "."){
        current = num;
    } else {
        current += num;
    }

    updateDisplay();
}

function selectOperator(op){

    if (operator && !resetNext) calculate();

    previous = parseFloat(current);
    operator = op;
    resetNext = true;

    historyBox.innerText = previous + " " + symbol(op);
    highlightOperator(op);
}

function calculate(){

    if (operator === null || previous === null) return;

    const curr = parseFloat(current);
    let result = 0;

    switch(operator){
        case "+": result = previous + curr; break;
        case "-": result = previous - curr; break;
        case "*": result = previous * curr; break;
        case "/": result = curr === 0 ? "Error" : previous / curr; break;
        case "^": result = Math.pow(previous, curr); break;
    }

    result = formatNumber(result);

    historyBox.innerText += " " + curr + " =";

    current = result.toString();
    operator = null;
    previous = null;
    resetNext = true;

    clearOperatorHighlight();
    updateDisplay();
}

function formatNumber(num){
    if (num === "Error") return num;
    if (!Number.isInteger(num)) return parseFloat(num.toPrecision(12));
    return num;
}

function symbol(op){
    if (op === "*") return "×";
    if (op === "/") return "÷";
    return op;
}

function button_clear(){
    current = "0";
    previous = null;
    operator = null;
    resetNext = false;
    historyBox.innerText = "";
    clearOperatorHighlight();
    updateDisplay();
}

function clear_entry(){
    current = "0";
    updateDisplay();
}

function backspace_remove(){
    if (resetNext) return;
    current = current.length > 1 ? current.slice(0,-1) : "0";
    updateDisplay();
}

function plus_minus(){
    if (current === "0") return;
    current = (parseFloat(current) * -1).toString();
    updateDisplay();
}

function square_root(){
    current = formatNumber(Math.sqrt(parseFloat(current))).toString();
    updateDisplay();
}

function power_of(){
    current = formatNumber(Math.pow(parseFloat(current),2)).toString();
    updateDisplay();
}

function division_one(){
    const val = parseFloat(current);
    current = val === 0 ? "Error" : formatNumber(1/val).toString();
    updateDisplay();
}

function calculate_percentage(){

    if (previous !== null){
        current = ((parseFloat(current)/100) * previous).toString();
    }else{
        current = (parseFloat(current)/100).toString();
    }

    updateDisplay();
}

function highlightOperator(op){

    clearOperatorHighlight();

    const map = {
        "+":"plusOp",
        "-":"subOp",
        "*":"multiOp",
        "/":"divOp"
    };

    document.getElementById(map[op]).style.background =
        "linear-gradient(145deg,#ffd11a,#ffb300)";
}

function clearOperatorHighlight(){
    document.querySelectorAll(".operator").forEach(btn=>{
        btn.style.background="";
    });
}

document.addEventListener("keydown", e=>{

    if (e.key >= "0" && e.key <= "9") inputNumber(e.key);
    if (e.key === ".") inputNumber(".");
    if (["+", "-", "*", "/"].includes(e.key)) selectOperator(e.key);
    if (e.key === "Enter" || e.key === "=") calculate();
    if (e.key === "Backspace") backspace_remove();
    if (e.key === "Escape") button_clear();

});

function toRadians(deg){
    return deg * (Math.PI/180);
}

function sci_sin(){
    current = formatNumber(Math.sin(toRadians(parseFloat(current)))).toString();
    updateDisplay();
}

function sci_cos(){
    current = formatNumber(Math.cos(toRadians(parseFloat(current)))).toString();
    updateDisplay();
}

function sci_tan(){
    current = formatNumber(Math.tan(toRadians(parseFloat(current)))).toString();
    updateDisplay();
}

function sci_log(){
    current = formatNumber(Math.log10(parseFloat(current))).toString();
    updateDisplay();
}

function sci_ln(){
    current = formatNumber(Math.log(parseFloat(current))).toString();
    updateDisplay();
}


function sci_factorial(){

    let n = parseInt(current);

    if (n < 0){
        current = "Error";
        updateDisplay();
        return;
    }

    let result = 1;
    for(let i=2;i<=n;i++) result *= i;

    current = result.toString();
    updateDisplay();
}
function insert_pi(){
    current = Math.PI.toString();
    updateDisplay();
}

function insert_e(){
    current = Math.E.toString();
    updateDisplay();
}
function cube(){
    current = formatNumber(Math.pow(parseFloat(current),3)).toString();
    updateDisplay();
}

function ten_power(){
    current = formatNumber(Math.pow(10,parseFloat(current))).toString();
    updateDisplay();
}

function exp(){
    current = formatNumber(Math.exp(parseFloat(current))).toString();
    updateDisplay();
}
function power_y(){
    selectOperator("^");
}
