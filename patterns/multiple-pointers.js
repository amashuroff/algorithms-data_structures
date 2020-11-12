"use strict";
// Write a function called sumZero which accepts a SORTED array of integers.
// The functions should find the first pair where the sum is 0.
// Return an array that includes both values that sums to 0,
// or undefined if such pair does not exists.

// naive solution, O(n^2)
function sumZero(sortedArr) {
  for (let val1 of sortedArr) {
    for (let val2 = val1 + 1; val2 < sortedArr.length; val2++) {
      // if sum === 0, return pair
      if (sortedArr[val2] + val1 === 0) return [val1, sortedArr[val2]];
    }
  }
}

function sumZeroPointers(sortedArr) {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left < right) {
    let sum = sortedArr[left] + sortedArr[right];

    if (sum === 0) {
      return [sortedArr[left], sortedArr[right]];
    } else if (sum > 0) {
      // [-3, ..., 4, 5] -3 + 5 is > 0, move and try -3 + 4, or otherwise
      right--;
    } else {
      left++;
    }
  }
  return undefined;
}

// console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]));
// console.log(sumZeroPointers([-3, -2, -1, 0, 1, 2, 3]));

// console.log(sumZero([-3, -2, -1, 0, 1, 4, 5]));
// console.log(sumZeroPointers([-3, -2, -1, 0, 4, 5]));

// Write a function called countUniqueValues, which accepts a SORTED array,
// and counts the UNIQUE values in the array.
// There can be negative numbers in the array, but it will always be SORTED.

// naive
function countUniqueValues(sortedArr) {
  if (!sortedArr.length) return 0;

  const uniqueValues = sortedArr.filter(
    (el, i, array) => array[i] !== array[i + 1]
  );

  let counter = 1;
  let left = 0;
  let right = uniqueValues.length - 1;

  while (left < right) {
    if (uniqueValues[left] !== uniqueValues[right]) {
      counter++;
    }
    right--;
  }

  return counter;
}

function countUniqueValues2(sortedArr) {
  if (!sortedArr.length) return 0;
  let left = 0;
  let right = left + 1;

  // [1,1,2,3] --> 1 equals to 1? yes, continue
  // 1 equals to 2? no, insert 2 like so [1,2,2,3]
  // 2 equals to 3? no, insert 3 like so [1,2,3,3]
  // 3 equals to 3? yes, continue
  // return left + 1 --> index when stopped + 1

  for (right; right < sortedArr.length; right++) {
    if (sortedArr[left] !== sortedArr[right]) {
      sortedArr[left + 1] = sortedArr[right];
      left++;
    }
  }
  return left + 1;
}

// instructor solution
function countUniqueValues3(sortedArr) {
  if (!sortedArr.length) return 0;

  let i = 0;

  for (let j = 1; j < sortedArr.length; j++) {
    if (sortedArr[i] !== sortedArr[j]) {
      i++;
      sortedArr[i] = sortedArr[j];
    }
  }

  return i + 1;
}

// console.log(countUniqueValues([1, 1, 1, 1, 1, 2, 3]));
// console.log(countUniqueValues([]));
// console.log(countUniqueValues([-1, 1, 1, 1, 1, 2, 3]));

// console.log(countUniqueValues2([1, 1, 1, 1, 1, 2, 3]));
// console.log(countUniqueValues2([]));
// console.log(countUniqueValues2([-1, 1, 1, 1, 1, 2, 3]));

// console.log(countUniqueValues3([1, 1, 1, 1, 1, 2, 3]));
// console.log(countUniqueValues3([]));
// console.log(countUniqueValues3([-1, 1, 1, 1, 1, 2, 3]));

function areThereDuplicates(...args) {
  // good luck. (supply any arguments you deem necessary.)
  if (!args[0].length) return false;
  let sortedArr;

  if (typeof args[0][0] === "number") {
    sortedArr = args[0].sort((a, b) => a - b);
  }
  sortedArr = args[0].sort();

  for (let right = 1; right < sortedArr.length; right++) {
    let left = right - 1;
    if (sortedArr[left] === sortedArr[right]) return true;
    left++;
  }
  return false;
}

// console.log(areThereDuplicates(["a", "b", "c"]));
// console.log(areThereDuplicates(["a", "b", "c", "a"]));
// console.log(areThereDuplicates([1, 2, 3]));
// console.log(areThereDuplicates([1, 2, 2]));

// Given a sorted array of integers and a target average, determine if there is
// a pair of values in the array where the average of the pair equals target avg.
// There may be more than 1 pair that matches the avg target

function averagePair(arr, targetAvg) {
  // add whatever parameters you deem necessary - good luck!

  if (arr.length === 0) return false;

  let left = arr[0];
  let right = arr[arr.length - 1];

  for (let i = 0; i < arr.length; i++) {
    if ((left + right) / 2 === targetAvg) return true;

    if ((left + right) / 2 > targetAvg) {
      right--;
    } else {
      left++;
    }
  }
  return false;
}

// console.log(averagePair([1, 2, 3], 2.5));
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1));
// console.log(averagePair([], 4));
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8));

// Write a function which takes 2 strings and checks whether the
// CHARACTERS of the first string form a subsequence of chars in the second string.
// The order matters.

function isSubsequence(str, targetStr) {
  // good luck. Add any arguments you deem necessary.
  let left = 0;
  let target = "";

  for (let i = 0; i < targetStr.length; i++) {
    if (str[left] === targetStr[i]) {
      target += str[left];
      left++;
    }
  }
  if (target === str) return true;
  return false;
}

// console.log(isSubsequence("hello", "hello world"));
// console.log(isSubsequence("sing", "sting"));
// console.log(isSubsequence("abc", "abracadabra"));
// console.log(isSubsequence("abc", "acd"));
