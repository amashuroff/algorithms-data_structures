"use strict";

// Write a function called maxSubArraySum which accepts
// an array of integers and a number called n.
// The function should calculate the max sum of n
// consecutive elements of an array

// O(n^2)
function maxSubArraySum(arr, num) {
  if (arr.length === 0 || num <= 0 || num > arr.length) return null;

  let maxSubArraySum = arr
    .slice(0, num)
    .reduce((previous, current) => previous + current, 0);

  for (let i = 0; i < arr.length - num + 1; i++) {
    let currentSubArraySum = arr
      .slice(i, i + num)
      .reduce((previous, current) => previous + current, 0);

    if (currentSubArraySum > maxSubArraySum) {
      maxSubArraySum = currentSubArraySum;
    }
  }

  return maxSubArraySum;
}

// O(n^2)
function maxSubArraySum2(arr, num) {
  if (arr.length === 0 || num <= 0 || num > arr.length) return null;

  let max = -Infinity; // account for neg val's in the arr
  for (let i = 0; i < arr.length - num + 1; i++) {
    let temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}

// O(n)
function maxSubArraySum3(arr, num) {
  if (arr.length === 0 || num <= 0 || num > arr.length) return null;

  let maxSum = 0;
  let tempSum = 0;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;

  // crucial part
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

// console.log(maxSubArraySum([1, 2, 5, 2, 8, 1, 5], 3)); // 10
// console.log(maxSubArraySum([], 4)); // null
// console.log(maxSubArraySum([4, 2, 1, 5], 1)); // 5

// console.log(maxSubArraySum2([1, 2, 5, 2, 8, 1, 5], 3)); // 10
// console.log(maxSubArraySum2([], 4)); // null
// console.log(maxSubArraySum2([4, 2, 1, 5], 1)); // 5

// console.log(maxSubArraySum3([1, 2, 5, 2, 8, 1, 5], 2)); // 10
// console.log(maxSubArraySum3([], 4)); // null
// console.log(maxSubArraySum3([4, 2, 1, 5], 1)); // 5
