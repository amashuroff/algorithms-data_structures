"use strict";

// Write the func called same which accepts 2 arrays.
// The function should return true if every value in the array has it's corresponding
// value squared in the second array. The frequency of values should be the same

// O(n^2)
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let value1 of arr1) {
    let correctIndex = arr2.indexOf(value1 ** 2);

    if (correctIndex === -1) return false;

    arr2.splice(correctIndex, 1);
  }
  return true;
}

// Refactored O(n)
function sameFrequency(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  // arr value acts as a key in obj
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) return false;

    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) return false;
  }
  return true;
}

// console.log(same([1, 2, 3, 2], [4, 9, 1, 5]));
// console.log(sameFrequency([1, 2, 3, 2], [4, 9, 1, 5]));

// Given 2 strings, write a function to determine if the second string is an anagram of the first.
// An anagram is a word, phrase or name formed by rearranging the letters of other, such as
// cinema - iceman

function isValidAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  for (let val of str1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }

  for (let val of str2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key in frequencyCounter2)) return false;

    if (frequencyCounter1[key] !== frequencyCounter2[key]) return false;
  }

  return true;
}

function isValidAnagram2(str1, str2) {
  if (str1.length !== str2.length) return false;

  let frequencyCounter = {};

  for (let letter of str1) {
    // letter exists in frequencyCounter ? increment by 1, else, set to 1
    frequencyCounter[letter]
      ? (frequencyCounter[letter] += 1)
      : (frequencyCounter[letter] = 1);
  }

  for (let char of str2) {
    // can't find letter of letter is 0;
    if (!frequencyCounter[char]) return false;

    frequencyCounter[char] -= 1;
  }

  return true;
}
// console.log(isValidAnagram("qwerty", "qeywrt"));
// console.log(isValidAnagram("qwerty", "hello"));

// console.log(isValidAnagram2("qwerty", "qeywrt"));
// console.log(isValidAnagram2("qwerty", "hello"));

function frequencyCounter3(num1, num2) {
  // good luck. (supply any arguments you deem necessary.)
  if (num1.toString().length !== num2.toString().length) return false;

  let frequencyCounter = {};

  let sNum1 = num1.toString();
  let sNum2 = num2.toString();

  for (let num of sNum1) {
    frequencyCounter[num]
      ? (frequencyCounter[num] += 1)
      : (frequencyCounter[num] = 1);
  }

  for (let num2 of sNum2) {
    if (!frequencyCounter[num2]) return false;

    frequencyCounter[num2] -= 1;
  }
  return true;
}

// console.log(frequencyCounter3(182, 281));
// console.log(frequencyCounter3(182, 221));
// console.log(frequencyCounter3(1823, 221));
