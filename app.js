'use strict';
var display = '0'; //what will show on the screen 
var num1 = []; // array for storing the first number 
var num2 = []; // array for storing the second number 
var op = '';  // variable for storing the operation 
var next = false; // true when an operator is stored, else it's false. when false, entered number is stored as the first number. when true, entered number is stored as the second number. 
var isDecimal1 = false; // true if the first number has a decimal point, else it's false 
var isDecimal2 = false; // true if the second number has a decimal point, else it's false 
var isReady = false; // true if both numbers and an operator exist, it's ready  
var neg1 = false; // true if the first number has a negative sign, else it's false 
var neg2 = false; // true if the second number has a negative sign, else it's false 
var equal = false; // true if hitting the equal button returned a solution 
var show = document.getElementById('screen');
var ac = document.getElementById('ac');

document.addEventListener('DOMContentLoaded', init);

function init(){
  var nums = document.getElementsByClassName('num');
  for (var i = 0; i < nums.length; i++) {
    nums[i].addEventListener('click', numClicked);
  };  
  var ops = document.getElementsByClassName('op');
  for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener('click', opClicked);
  };  
  document.getElementById('equal').addEventListener('click', equalClicked);
  ac.addEventListener('click', acClicked);
  document.getElementById('neg').addEventListener('click', negClicked);
  document.getElementById('decimal').addEventListener('click', decimalClicked);
  document.getElementById('percent').addEventListener('click', percentClicked);
}

function numClicked(event){  
  ac.textContent = 'C';
  var text = this.textContent; 
  if (equal) {
    num2 = []; 
    isReady = false; 
    neg2 = false; 
    isDecimal2 = false;
    equal = false; 
  };
  if (next) {      
    isReady = true; 
    display = pressNum(num2, text); 
    show.textContent = display;
  } else {       
    display = pressNum(num1, text); 
    show.textContent = display;
  }
}

function opClicked (event) {  
  if (isReady && !equal) {      
    var solution = doMath(num1, op, num2); 
    display = solution.toString(); 
    num1 = display.split(''); 
    num2 = []; 
    neg2 = false; 
    isDecimal2 = false;       
    isReady = false;  
    show.textContent = display;
  };
  if (equal) {
    num2 = []; 
    isReady = false; 
    neg2 = false; 
    isDecimal2 = false;
    equal = false; 
  };
  op = this.textContent;
  next = true;                            
}

function equalClicked(event){    
  if (isReady) {
    var solution = doMath(num1, op, num2); 
    display = solution.toString(); 
    num1 = display.split('');       
    equal = true; 
    show.textContent = display;
  };
}

function acClicked(event){  
  ac.textContent = 'AC';
  display = '0'; 
  next = false; 
  isDecimal1 = false; 
  isDecimal2 = false; 
  isReady = false; 
  neg1 = false; 
  neg2 = false; 
  num1 = []; 
  num2 = []; 
  op = '';   
  equal = false;    
  show.textContent = display;
}

function negClicked(event){   
  if (next) {
    if (neg2) {
      neg2 = false; 
      num2.shift(); 
    } else {
      neg2 = true; 
      num2.unshift('-');
    }
    display = num2.join('');      
  } else {
    if (neg1) {
      neg1 = false; 
      num1.shift(); 
    } else {
      neg1 = true;          
      num1.unshift('-');
    }       
    display = num1.join('');
  };
  show.textContent = display;
}

function decimalClicked(event){  
  if (next) {
    if (isDecimal2 === false) {
      isDecimal2 = true; 
      num2.push('.');
      display = num2.join('');
    };
  } else {
    if (isDecimal1 === false) {
      isDecimal1 = true; 
      num1.push('.');
      display = num1.join('');
    };
  };
  show.textContent = display;
}

function percentClicked(event){  
  var temp; 
  if (next) {       
    temp = doPercent(num2); 
    num2 = temp.toString().split('');       
    display = num2.join('');      
  } else {        
    temp = doPercent(num1); 
    num1 = temp.toString().split('');       
    display = num1.join('');
  };
  show.textContent = display;
}

var doMath = function(num1, op, num2){
  var num1 = parseFloat(removeComma(num1.toString()));
  var num2 = parseFloat(removeComma(num2.toString()));
  switch (op) {
    case '+':
    return (num1+num2);
    case '-': 
    return (num1-num2);     
    case '*':   
    return (num1*num2);      
    case '/':       
    var quotient = num1;
    quotient /= num2; 
    return quotient; 
    default:
    return (num1%num2);    
  }
}; 

var removeComma = function(str){
  return str.replace(/,+/g, '');
};

var pressNum = function(numArr, text){ 
  if (!numArr[0] && text === '0') {
    return '0';  // to not repeatedly stack 0s. 
  }
  numArr.push(text); 
  return numArr.join('');             
}; 

var doPercent = function(numArr){
  if (!numArr[0]) { return 0; };
  var temp = parseFloat(removeComma(numArr.toString()));
  return (temp /= 100); 
}; 