# Algorithms and Data Structures

---

## How do you improve?

---

1. Devise a plan - Problem solving approach
2. Master common problem solving patterns

### Problem solving approach.

1. Understand a problem
1. Explore concrete examples
1. Break it down
1. Solve/Simplify
1. Look back and refactor

### Understand the problem: (Step back and understand the question/problem)

1. Restate problem in your own words
2. What are the I/O?
3. Can be outputs determined from the inputs? (may be skipped)
4. How should you label important pieces of data that are part of the problem?

### Examine the edge cases, different inputs/cases (usually applied to real world problems)

### Break it Down:

1. Explicitly write down the steps you need to take (pseudocode/comments)

### Simplify:

1. Find the core difficulty
2. Temporarily ignore that difficulty
3. Write a simplified solution
4. Incorporate difficulty back in

### Look back and refactor / questions / VERY IMPORTANT:

1. Can you check the result?
2. Can you derive the result differently?
3. Can you understand it at a glance?
4. Can you use the result in some other problem?
5. Can you improve the performance of your solution?
6. Can you think of other ways to refactor?
7. How have other people solved this problem?

## Problem Solving Patterns.

---

### Frequency counters

- Pattern uses objects / sets to collect values / frequencies of values
- Often used to avoid the need for nested loops or O(n^2) ops. with arrays / strings

```javascript
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
```

### Multiple pointers

- Creating pointers or values that correspond to an index or position and move towards the beginning, end or middle based on certain condition
- Very efficient for solving problems with minimal space complexity as well.

```javascript
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
```

### Sliding Window

- Pattern involves creating a window which can either be an array or number from one position or another
- Depending on a certain condition, the window either increases or closes (and new window is created)
- Very useful to keep track of a subset of data in array/string etc.

```javascript
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
```

### Divide and Conquer

- Divide data set into smaller chunks and then repeat a process with the smaller subset of data
- Tremendously decreases time complexity

## Recursion

---

### What is Recursion?

- A process that calls itself (function)

### It is everywhere!

- JSON.parse / JSON.stringify
- document.getElementById, and DOM traversal algorithms
- Object traversal
- More complex data structures
- Sometimes it is a cleaner alternative solution

### The Call stack

- Anytime function is invoked, its pushed to the top of the stack
- Anytime JS engine sees return keyword or function ends the compiler will remove it from the stack (pop it)

### Two essential parts of a recursive function

- Base case, where recursive calls stop
- Different input

### Where things go wrong

- No base case
- Forgetting to return or return the wrong value
- STACK OVERFLOW!!!

## HELPER METHOD RECURSION PATTERN

- using recursive function of a function that was declared in another function (helper)

## PURE RECURSION TIPS

- use slice, spread and concat that make copies of arrays so you don't mutate them
- strings are immutable, so use slice, sbstr, or substring to make copies of strings
- to make copies of objects use Object.assign or spread operator.

```javascript
// first simple recursive function
function countDown(num) {
  if (num <= 0) {
    console.log("All done");
    return;
  }
  console.log(num);
  num--;
  countDown(num);
}

// countDown(7);

// second simple recursive function
function sumRange(num) {
  if (num === 1) return 1;

  return num + sumRange(num - 1);
}

// console.log(sumRange(5));

// factorial recursively

function factorial(num) {
  if (num === 1) return 1;

  return num * factorial(num - 1);
}

// console.log(factorial(4));

// HELPER METHOD RECURSION PATTERN

function outer(input) {
  let outerScopedVariable = [];

  function helper(helperInput) {
    // modify the outerScopedVariable
    helper(helperInput--);
  }

  helper(input);

  return outerScopedVariable;
}

// collect odd values

function collectOddValues(numsArr) {
  let result = []; // don't thrash global scope

  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }

    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }

    helper(helperInput.slice(1));
  }

  helper(numsArr);

  return result;
}

// console.log(collectOddValues([1, 2, 3, 4, 5, 6]));

// PURE RECURSION

function collectOddValuesPure(arr) {
  let newArr = [];

  if (arr.length === 0) {
    return newArr;
  }

  if (arr[0] % 2 !== 0) {
    newArr.push(arr[0]);
  }

  newArr = newArr.concat(collectOddValuesPure(arr.slice(1)));

  return newArr;
}

// console.log(collectOddValuesPure([1, 2, 3, 4, 5, 6]));

// problem-1
// Write a function that accepts a base and exponent,
// the function should return the power of the base to the exponent.
// the function should mimic the functionality of Math.pow() - do not worry about negative bases and exponents.
function power(base, exp) {
  if (exp === 0) return 1;

  return base * power(base, exp - 1);
}

// console.log(power(2, 0)); // 1
// console.log(power(2, 2)); // 4
// console.log(power(2, 4)); // 16

// problem-2
// Write a function that accepts a number and returns a factorial of that number
// 5! = 5 * 4 * 3 * 2 * 1
function factorial(num) {
  if (num === 1 || num === 0) return 1;

  return num * factorial(num - 1);
}

// console.log(factorial(1)); // 1
// console.log(factorial(2)); // 2
// console.log(factorial(4)); // 24
// console.log(factorial(7)); // 5040

// problem-3
// Write a function that takes in array and returns the product of them all
function productOfArray(arr) {
  if (arr.length === 1) return arr[0];

  return arr[0] * productOfArray(arr.slice(1));
}

// console.log(productOfArray([1, 2, 3])); // 6
// console.log(productOfArray([1, 2, 3, 10])); // 60

// problem-4
// Write a function that accepts a number and adds up all the numbers from 0
// to the number passed to the function.
function recursiveRange(num) {
  if (num === 1) return 1;

  return num + recursiveRange(num - 1);
}

// console.log(recursiveRange(6)); // 21
// console.log(recursiveRange(10)); // 55

// problem-5
// Write a function that accepts a number and returns the n-th num
// in the Fibonacci sequence --> 1,1,2,3,5,8... every number in sequence is the sum of the
// previous 2 numbers
function fib(num) {
  if (num <= 2) return 1;

  return fib(num - 1) + fib(num - 2);
}

// console.log(fib(4)); // 3
// fib(10); // 55
// fib(28); // 317811
// console.log(fib(35)); // 9227465
```
