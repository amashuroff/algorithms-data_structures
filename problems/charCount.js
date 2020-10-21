"use strict";
// write a function that takes in a string and returns counts of each character in a string
// output {a: 5, b: 2, c:2}

// initial / quick / does work for not alphanumeric chars
function charCount(str) {
  const sortedString = str.split(" ").sort().join("").toLowerCase();
  let previousChar = "";
  let counter = 0;
  let result = {};
  for (let char of sortedString) {
    if (char !== previousChar) {
      counter = 0;
      previousChar = char;
    }
    counter++;
    result[char] = counter;
  }
  return result;
}

// refactored
function charCount2(str) {
  const sortedString = str.toLowerCase();
  let result = {};
  for (let char of sortedString) {
    if (isAlphaNumeric(char)) {
      result[char] = ++result[char] || 1;
    }
  }
  return result;
}

function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) &&
    !(code > 64 && code < 91) &&
    !(code > 96 && code < 123)
  ) {
    return false;
  }
  return true;
}

console.log(charCount("helloWorlds123912!!!!"));
console.log(charCount2("hello Worlds 123912!!!!"));
