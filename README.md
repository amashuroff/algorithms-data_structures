# Algorithms and Data Structures

## Table of Contents

[Problem Solving Approach](#how-do-you-improve?)

[Problem Solving Patterns](#problem-solving-patterns)

[Recursion](#recursion)

[Searching Algorithms](#searching-algorithms)

[Sorting Algorithms](#sorting-algorithms)

[Data structures](#data-structures)

## How do you improve?

1. Devise a plan - Problem solving approach
2. Master common problem solving patterns

### Problem solving approach

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

## Problem Solving Patterns

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

### Challenges/Problem sets: Multiple pointers, frequency counters, sliding window

```javascript
// frequency counters
// problem 1
// Given 2 numbers, find out if the 2 numbers have the same frequency of characters
function sameFrequency(num1, num2) {
  // good luck. Add any arguments you deem necessary.
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

// multiple pointers
// problem 1
// takes in a variable number of arguments
// checks whether there are any duplicates among the arguments passed in
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

// problem 2
// Given a sorted array of integers and a target average, determine if there is
// a pair of values in the array where the average of the pair equals target avg.
// There may be more than 1 pair that matches the avg target

function averagePair(arr, targetAvg) {
  // add whatever parameters you deem necessary - good luck!

  if (arr.length === 0) return false;

  let left = 0;
  let right = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    if ((arr[left] + arr[right]) / 2 === targetAvg) return true;

    if ((arr[left] + arr[right]) / 2 > targetAvg) {
      right--;
    } else {
      left++;
    }
  }
  return false;
}

// console.log(averagePair([1, 2, 3], 2.5)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); //false
// console.log(averagePair([], 4)); // false
// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); //true

// problem 3
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

// console.log(isSubsequence("hello", "hello world")); // true
// console.log(isSubsequence("sing", "sting")); // true
// console.log(isSubsequence("abc", "abracadabra"));  //true
// console.log(isSubsequence("abc", "acd"));  // false

// sliding window
// problem 1
// Write a function that finds the maximum sum of subarray
// with the length of the number passed to the function
function maxSubarraySum4(arr, num) {
  // add whatever parameters you deem necessary - good luck!
  if (num > arr.length) return null;

  let maxSum = 0;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  let currentSum = maxSum;

  for (let i = num; i < arr.length; i++) {
    currentSum += arr[i] - arr[i - num];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// console.log(maxSubarraySum4([100, 200, 300, 400], 2)); // 700
// console.log(maxSubarraySum4([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
// console.log(maxSubarraySum4([-3, 4, 0, -2, 6, -1], 2)); // 5
// console.log(maxSubarraySum4([2, 3], 3)); // null

//problem 2
// Function accepts 2 params: array of positive integers and a positive integer
// The function should return the minimal length of a contiguous subarray
// of which the sum is greater than or equal to the integer passed to the function.
// if there is no one, return 0
function minSubArrayLen(arr, num) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minimalLength = Infinity;

  while (start < arr.length) {
    if (total < num && end < arr.length) {
      total += arr[end];
      end++;
    } else if (total >= num) {
      minimalLength = Math.min(minimalLength, end - start);
      total -= arr[start];
      start++;
    } else {
      break;
    }
  }

  return minimalLength === Infinity ? 0 : minimalLength;
}

// problem 3
// Write a function called findLongestSubstring which accepts a string and
// returns the length of the longest substring with all distinct characters

function findLongestSubstring(str) {
  let longest = 0;
  let seen = {};
  let start = 0;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }

    console.log(start);

    longest = Math.max(longest, i - start + 1);

    seen[char] = i + 1;
  }
}

// console.log(findLongestSubstring("")); // 0
// console.log(findLongestSubstring("rithmschool")); // 7
// console.log(findLongestSubstring("thisisawesome")); // 6
// console.log(findLongestSubstring("bbbb")); // 1
```

### More problems

```javascript
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

// refactored/instructor
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

// instructor solution
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
```

### Divide and Conquer

- Divide data set into smaller chunks and then repeat a process with the smaller subset of data
- Tremendously decreases time complexity

## Recursion

### What is Recursion?

- A process that calls itself (function)

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
```

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

```javascript
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
```

## PURE RECURSION TIPS

- use slice, spread and concat that make copies of arrays so you don't mutate them
- strings are immutable, so use slice, sbstr, or substring to make copies of strings
- to make copies of objects use Object.assign or spread operator.

```javascript
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
```

### Recursion problem set

```javascript
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

## Searching Algorithms

### Linear Search

- from O(1) to O(n)

```javascript
// O(n)
function linearSearch(nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) return i;
  }

  return -1;
}
```

### Binary search

- Eliminate half of the remaining elements at a time
- Only works on sorted arrays

```javascript
// O(log n)
function binarySearch(sortedArr, val) {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    let middle = Math.floor((right + left) / 2);
    if (sortedArr[middle] === val) {
      return middle;
    } else if (sortedArr[middle] < val) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}
// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 2));
```

### Naive string search

```javascript
// Naive string search - O(n^2)
function naiveStringSearch(str, target) {
  // loop over the str
  // remember current index
  // match acts as a checker
  for (let i = 0; i < str.length; i++) {
    let match = 0;
    let currentI = i;

    // loop over the target str
    // if match, increment match by 1
    // increment str's index by one to check the next character
    for (let j = 0; j < target.length; j++) {
      if (str[currentI] !== target[j]) {
        break;
      }
      match++;
      currentI++;
    }

    if (match === target.length) return true;
  }

  return false;
}

// console.log(naiveStringSearch("wowzomg", "omg"));

// Naive approach-2 O(n^2)
function naiveStringSearch2(str, subStr) {
  let count = 0;
  //loop over the long string and stop if the remaining string after i is smaller than the small string
  for (let i = 0; i < str.length && str.length - i >= subStr.length; i++) {
    //check if the first character of the short string is the same as the current one in the long string
    //then if true slice the long string to give a word with the same length as the small string
    //then compare this string to the small string
    //if all of this is true then increment
    if (str[i] === subStr[0] && str.slice(i, i + subStr.length) === subStr)
      count++;
  }
  return count;
}

// Naive approach instructor O(n^2)
function naiveStringSearch3(str, subStr) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < target.length; j++) {
      // add j to i to get the next char in str
      if (target[j] !== str[i + j]) {
        break;
      }

      if (j === target.length - 1) {
        count++;
      }
    }
  }

  return count;
}
```

## Sorting Algorithms

- Sorting is rearranging items in a collection so that the items are in sime kind of order

### Bubble sort / Insertion sort / Selection sort

- all are roughly the same
- all have avg time complexity: quadratic

### Bubble sort

```javascript
// built in js sort
function numCompare(num1, num2) {
  // if negative, num1 should be before num2
  // if positive, num1 should come after num2
  // if 0, together
  return num1 - num2;
  //   return num2 - num1;
}

// console.log([1, 3, 5, 5, 2, 7].sort(numCompare));

function strLenCompare(len1, len2) {
  return len1 - len2;
}

// swapping
function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

const swap2 = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

// works fine on almost sorted arrays
function bubbleSort(arr) {
  // start looping from the end of an array till the beginning

  // optimizing bubble sort, stop comparing if nearly sorted
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    // start looping from the start of the array until the already bubbled number
    // during the first iteration it will go until the end of an array 5 - 1 (i - 1)
    for (let j = 0; j < i - 1; j++) {
      // do the swapping
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        noSwaps = false;
      }
    }

    if (noSwaps) break;
  }

  return arr;
}

// console.log(bubbleSort([1, 3, 1, 7, 5, 10]));
```

### Insertion sort

```javascript
function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// works fine when the data is coming (for example live data stream)
// since largest portion of an array is already sorted
function insertionSort(arr) {
  // compare the second elem with the one before and swap if necessary
  if (arr[1] < arr[0]) {
    swap(arr, 0, 1);
  }

  // start by picking the second elem in the array
  for (let i = 1; i < arr.length - 1; i++) {
    // arr.length - 1 so we don't get undefined on the last iteration
    // if the next element in the array is > then previous one
    if (arr[i + 1] < arr[i]) {
      // iterate through sorted portion
      for (let j = 0; j < i + 1; j++) {
        // insert an element, where it belongs
        if (arr[j] > arr[i + 1]) {
          swap(arr, j, i + 1);
        }
      }
    }
  }

  return arr;
}

// console.log(insertionSort([3, 1, 2, 7, 9, 2]));

function insertionSort2(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];

    for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j];
    }

    // console.log(j);
    arr[j + 1] = currentVal;
  }

  return arr;
}

// console.log(insertionSort2([3, 1, 2, 7, 9, 2]));
```

### Selection Sort

```javascript
function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // remember the index at the start of the array iteration
    // [123]
    // assume that first item in the array is minimum
    let min = i;

    // [23]
    // iterate through the array starting from i + 1
    for (let j = i + 1; j < arr.length; j++) {
      // compare values, update min index if condition
      if (arr[min] > arr[j]) {
        min = j;
      }
    }

    // at the end of the iteration compare if the starting index is not === to min
    if (i !== min) {
      swap(arr, i, min);
    }
  }

  return arr;
}

// console.log(selectionSort([3, 1, 2, 7, 9, 2]));
```

### Merge sort - O(n log n)

- combination of sorting and merging
- split all the numbers in solo arrays
- merge and sort

```javascript
// Merging arrays
// Given 2 arrays are sorted, this helper function should create a new array
// which is also sorted, and consists of all the elements in the 2 input arrays
// the function should run in O(n + m) (n - first arr, m-second arr) time and O(n + m) space, and
// should not modify the parameters passed into in

function merge(arr1, arr2) {
  let result = [];

  let i = 0;
  let j = 0;
  // while i or j is less then or equal to the last el of the array
  // meaning we exhausted one of the arrays
  while (i < arr1.length && j < arr2.length) {
    // push the smallest number to the resulting array

    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  // if 1 array still has elements in it after the while loop,
  // push rest of an array to the result

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

// console.log(merge([1, 2, 3], [5, 6, 7, 8, 9]));

// Merge sort O(n log n) - avg, space - O(n)
// Log(n) splits, n comparisons
function mergeSort(arr) {
  if (arr.length === 1) return arr;

  return merge(
    mergeSort(arr.slice(0, Math.ceil(arr.length / 2))),
    mergeSort(arr.slice(Math.ceil(arr.length / 2)))
  );
}

// console.log(mergeSort([1, 3, 5, 2, 7, 8, 9, 2]));
```

### Quick sort

- as merge sort, takes advantage of knowing that arrays of [] or [1] are always sorted
- works by selecting pivot, and moving all the numbers that are greater then that number to the right, and all the numbers that are less then that number to the right
- selecting a pivot is an important part, The runtime of quick sort depends on how one selects the pivot, ideally (median value)
- Best case: O(log n) , O(n) comparisons per compositions, O(n log n)
- Worst case: O(n) quick sorting already sorted array, with this current setup, where the pivot is the first el.
- Worst case happens when the pivot is always the min or max element of an array

```javascript
function pivotHelper(arr, start = 0, end = arr.length - 1) {
  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  let pivotIndex = start; // where to swap at the end

  // move all elements that are lower then the pivot to the right of that pivot
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < arr[start]) {
      pivotIndex++;
      swap(arr, pivotIndex, i);
    }
  }

  // put the pivot in place of pivot index
  swap(arr, start, pivotIndex);
  return pivotIndex;
}

// console.log(pivotHelper([5, 2, 1, 8, 4, 7, 6, 3], 0, 7));

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (right > left) {
    let pivotIndex = pivotHelper(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }

  return arr;
}

// console.log(quickSort([4, 6, 9, 1, 2, 5, 3]));
```

### Radix Sort

- there is a mathematical bound to comparison sorting algs, it is related to the information that we get from a single comparison
- fastest algorithm is going to be O(n log n), if doing only 1 comparison at a time
- Radix sort never makes comparisons between 2 elements
- It exploits the fact that information about the number is encoded in the number of digits
- Avg time complexity O(nk), O(n + k) space complexity

```javascript
function getDigit(num, place) {
  return Math.floor((Math.abs(num) / Math.pow(10, place)) % 10);
}
// console.log(getDigit1(12345, 0)); // 5

function digitCount(num) {
  // My solution
  // returns the number of digits in num
  if (num === 0) return 1;

  let result = 0;

  while (true) {
    num /= 10;
    result++;
    if (num < 1) break;
  }

  return result;
}

// console.log(digitCount(12345)); // 5
// console.log(digitCount(1)); // 1

// Stack overflow solution
function digitCount1(num) {
  // returns the number of digits in num

  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// console.log(digitCount1(12345)); // 5

// My solution
function mostDigits(numArr) {
  // given an array of numbers, returns the number of digits in the largest number in the list

  return digitCount(Math.max(...numArr));
}

// console.log(mostDigits([1, 2, 333, 2, 5]));

// Radix sort
function radixSort(arr) {
  // define a function that accepts a list of numbers
  // figure out how many digits the largest number has
  // Loop from k = 0 up to this largest number of digits
  // for each iteration of the loop:
  //    create buckets for each digit from (0 to 9)
  //    place each number in the corresponding bucket based on its k-th digit
  // Replace our existing array with values from our buckets, starting from 0 and going up to 9
  // Return a list in the end

  const maxDigits = mostDigits(arr);

  for (let k = 0; k < maxDigits; k++) {
    const buckets = [[], [], [], [], [], [], [], [], [], []];

    for (let i = 0; i < arr.length; i++) {
      buckets[getDigit(arr[i], k)].push(arr[i]);
    }

    arr = [].concat(...buckets);
  }

  return arr;
}

// console.log(radixSort([1, 3, 77, 5823, 0, 123, 130]));
```

## Data structures

- Data structures are collections of values, the relationships among them, and the functions or operations that can be applied to the data
- Example: Array --> it contains values, relationships between them (order), and all sorts of functionality
- Different DS excel at different things, many of them are highly specialized.
- There is NO BEST DS

### Singly Linked List

- List consists of a bunch of nodes
- Node has a value
- Node references the next node (pointer)
- DS that contains head (beginning), tail (end) and a length property, we keep track of those things

- SLL vs ARR:
- SLL do not have indexes, random access do not allowed
- ARR insertion and deletion can be expensive

- Big O of SLL:

1. insertion - O(1), very simple to shift/unshift, push
2. Removal - depends, from beginning? super easy, O(1), pop() requires iterating through entire list - O(n)
3. Searching - O(n), in case of arrays O(1)
4. Access - O(n), in case of arrays O(1)

- SLL excels on deletion/adding from the beginning
- if you want your data to be ordered, don't care about random access and care about insertion/removal times (from the beginning)

```javascript
// Singly linked list
// piece of data - val
// reference to next value - next

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
      this.length++;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }

    return this;
  }

  pop() {
    // if empty
    if (!this.head) return undefined;

    let previousValue = this.head;
    let nextValue = this.head.next;

    while (nextValue.next !== null) {
      previousValue = previousValue.next;
      nextValue = nextValue.next;
    }

    previousValue.next = null;
    this.tail = previousValue;
    this.length--;

    return this;
  }

  shift() {
    // removes the first element of the ll and returns it
    if (!this.head) return undefined;

    const shiftedValue = this.head;

    this.head = this.head.next;
    this.length--;

    return shiftedValue;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.head = this.tail;
    } else {
      const prevHead = this.head;
      this.head = newNode;
      this.head.next = prevHead;
    }
    this.length++;
    return this;
  }

  get(idx) {
    // returns an item in it's position in the ll
    if (idx < 0 || idx >= this.length) return null;

    let node = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) return node;
      node = node.next;
    }
  }

  set(idx, val) {
    // replace an item at idx with val

    const node = this.get(idx);
    if (!node) return false;

    node.val = val;
    return true;
  }

  insert(idx, val) {
    // insert new node at idx
    if (idx < 0 || idx > this.length) return false;
    // make them truthy/falsy
    if (idx === this.length) return !!this.push(val);
    if (idx === 0) return !!this.unshift(val);

    const newNode = new Node(val);
    const prev = this.get(idx - 1);
    const node = prev.next;

    prev.next = newNode;
    newNode.next = node;
    this.length++;
    return true;
  }

  remove(idx) {
    if (idx < 0 || idx > this.length) return undefined;
    if (idx === this.length) return this.pop();
    if (idx === 0) return this.shift();

    const prev = this.get(idx - 1);
    // previous node's next disappears
    prev.next = prev.next.next;
    this.length--;
    return true;
  }

  reverse() {
    // swap tail and head
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    let prev, next;
    prev = next = null;

    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    return this;
  }

  print() {
    const arr = [];
    let current = this.head;

    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

const list = new SinglyLinkedList();

// PUSH

// head and tail are the same object
list.push("first item");

// we update .next property on the tail (head) to point to the new object
// we update tail to point to the same new object
list.push("second item");

// we update the .next on the tail, which is also .next (object) on the head
// to point to the new object, there is some nesting going on head.next.next... etc
// we update our tail to be the new object we just created, the same one which is currently
// on the head's .next.next
list.push("third item");

// PUSH

// POP

// start from the head
// let previous value be head
// let next value be head.next

// while next value.next !== null
// move previous value
// move next value

// in the end, set previous value.next to null
// set tail to previous value

// list.pop();

// POP

// SHIFT

// list.shift();

// SHIFT

//UNSHIFT

// list.unshift("add new item to the start");

//UNSHIFT

// GET

// console.log(list.get(1));

// GET

// SET

// console.log(list.set(1, "replaced the value"));

//SET

//INSERT

// console.log(list.insert(2, "inserted new item"));

//INSERT

// REMOVE

// list.remove(1);

// REMOVE

// REVERSE

// list.reverse();

// REVERSE

// console.log(list);
```

### Doubly Linked List

- More flexible, but takes more memory (new pointer)
- Big 0:

1. Insertion O(1)
2. Removal O(1)
3. Searching O(n) (technically N/2)
4. Access O(n)

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = null;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.tail = node;
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.length) return undefined;

    const prevTail = this.tail;
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.tail = prevTail.prev;
      this.tail.next = null;
    }
    // return only the node, without "prev" reference
    prevTail.prev = null;
    this.length--;
    return prevTail;
  }

  shift() {
    if (!this.length) return undefined;

    const prevHead = this.head;
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = prevHead.next;
      this.head.prev = null;
    }
    prevHead.next = null;
    this.length--;
    return prevHead;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(idx) {
    // working from one of the other sides, depending on the idx provided
    if (idx === this.length || idx > this.length) return null;

    const half = Math.floor(this.length / 2);
    let result;
    if (idx < half) {
      let i = 0;
      result = this.head;
      while (i !== idx) {
        result = result.next;
        i++;
      }
    } else {
      let i = this.length - 1;
      result = this.tail;
      while (i !== idx) {
        result = result.prev;
        i--;
      }
    }

    return result;
  }

  set(idx, val) {
    const node = this.get(idx);
    if (!node) return false;

    node.val = val;
    return true;
  }

  insert(idx, val) {
    if (idx < 0 || idx > this.length) return false;

    if (idx === 0) return !!this.unshift(val);

    if (idx === this.length) return !!this.push(val);

    const newNode = new Node(val);
    const beforeNode = this.get(idx - 1);
    const afterNode = beforeNode.next;

    (beforeNode.next = newNode), (newNode.next = afterNode);
    (newNode.prev = beforeNode), (afterNode.prev = newNode);
    this.length++;
    return true;
  }

  remove(idx) {
    if (idx === this.length || idx > this.length) return undefined;
    if (idx === 0) return this.shift();
    if (idx === this.length - 1) return this.pop();

    const nodeBefore = this.get(idx - 1);
    const node = nodeBefore.next;
    const nodeAfter = node.next;

    nodeBefore.next = nodeAfter;
    nodeAfter.prev = nodeBefore;
    node.next = null;
    node.prev = null;
    this.length--;
    return node;
  }

  reverse() {
    // swap head and tail
    let node = this.head;
    this.head = this.tail;
    this.tail = node;

    for (let i = 0; i < this.length; i++) {
      // previous node will be next node in the normal order
      let prev = node.next;
      node.next = node.prev;
      node.prev = prev;
      node = prev;
    }
  }
}

const dll = new DoublyLinkedList();

// PUSH
dll.push(1);
dll.push(2);
dll.push(3);
// PUSH

// POP
// dll.pop();
//POP

//SHIFT
// dll.shift();
//SHIFT

//UNSHIFT
// dll.unshift(3);
//UNSHIFT

//GET
// console.log(dll.get(1));
//GET

//SET
// dll.set(1, 10);
//SET

//INSERT
// dll.insert(2, 100);
//INSERT

//REMOVE
// dll.remove(1);
//REMOVE
console.log(dll);
```

### Stacks and Queues

- Both are abstract data structures (collection of data)

1. Stack - LIFO (last in first out), used in UNDO/RE-DO, managing function invocations, routing/history object is treated as a stack, pages you visited.

- Big O of Stacks -> insertion/removal: O(1), searching, access: O(n) (but we care only about insertion/removal in stacks)

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // push and pop are actually shift and unshift

  pop() {
    // removes the first element of the ll and returns it
    if (!this.first) return undefined;

    const shiftedValue = this.first;

    this.first = this.first.next;
    this.size--;

    return shiftedValue;
  }

  push(val) {
    const newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.first = this.last;
    } else {
      const prevHead = this.first;
      this.first = newNode;
      this.first.next = prevHead;
    }
    this.size++;
    return this;
  }
}
```

2. Queues - FIFO (first in first out) -> Background tasks, uploading resources, printing for example, same Big O as in Stacks

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// add to the end and remove from the beginning
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(val) {
    const newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
    return this;
  }

  dequeue(val) {
    const newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
      this.first = this.tail;
    } else {
      const prevHead = this.first;
      this.first = newNode;
      this.first.next = prevHead;
    }
    this.size++;
    return this;
  }
}
```

### Trees

- a tree consists of nodes in a child/parent relationship
- Trees are non-linear, in ll or dll there is only one path
- Think of ll as a special case of a tree
- Leaf a node with no children
- Edge an array between the nodes

1. Just a tree, can have multiple nodes and branches
2. Binary tree, can have no more than 2 branches
3. Binary Search Tree, items are sorted, lesser items to the left (lesser than the branch), greater to the right

- BST: Searching, Insertion O(log n) -> best and avg case. Why, there are some valid BST cases that have S,I of O(n), like 0->1->2->3 (completely valid, like ll)

```javascript
class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (val < current.val) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = newNode;
          return this;
        }
      } else if (val > current.val) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = newNode;
          return this;
        }
      } else {
        console.log("Already exists");
        return this;
      }
    }
  }

  find(val) {
    if (!this.root) return undefined;
    if (this.root.val === val) return true;

    let current = this.root;

    while (current !== null) {
      if (val < current.val) {
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        return true;
      }
    }

    return false;
  }

  findRecursive(val, node = this.root) {
    if (!node) return false;
    if (node.val === val) return true;

    if (node.val > val) {
      return this.findRecursive(val, node.left);
    }

    if (node.val < val) {
      return this.findRecursive(val, node.right);
    }
  }
}

const tree = new BST();
tree.root = new Node(10);
tree.root.left = new Node(5);
tree.root.right = new Node(15);
console.log(tree);

//INSERT
// tree.insert(30);
//INSERT

//FIND
// console.log(tree.find(100));
//FIND
```

### Tree traversal

- Two ways of traversing a tree
- Breadth first search
- Depth first search
- Visiting all the nodes at the same level? Or going down the tree first?
- Time complexity of BFS and DFS is the same
- if tree is WIDE, breadth first will take up more space
- if tree is DEEP, depth first will take up more space
- In order is useful in BST's
- Pre order is useful to clone the tree in array for example/db

```javascript
class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (val < current.val) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = newNode;
          return this;
        }
      } else if (val > current.val) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = newNode;
          return this;
        }
      } else {
        console.log("Already exists");
        return this;
      }
    }
  }

  // Breadth first approach
  BFS() {
    const data = [],
      queue = [];
    let node = this.root;
    queue.push(this.root);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  // Depth first approach
  dfsPreOrder() {
    // visit nodes from left to right
    // the root is the first thing that we visit
    const data = [];

    function traverse(node) {
      data.push(node.val);

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return data;
  }

  dfsPostOrder() {
    // traverse the entire tree first, then visit nodes
    // the root is the last thing that is visited
    const data = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

      data.push(node.val);
    }

    traverse(current);

    return data;
  }

  dfsInOrder() {
    // traverse the entire tree first, then visit nodes in ORDER (get sorted array)
    // the root is the last thing that is visited
    const data = [];
    let current = this.root;

    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.val);
      if (node.right) traverse(node.right);
    }

    traverse(current);

    return data;
  }
}

const tree = new BST();
tree.root = new Node(10);
tree.root.left = new Node(5);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(7);
tree.root.left.left.left = new Node(1);
tree.root.right = new Node(15);

//BFS
// console.log(tree.BFS());
//BFS

//DFS preOrder
// console.log(tree.dfsPreOrder());
//DFS preOrder

//DFS postOrder
// console.log(tree.dfsPostOrder());
//DFS postOrder

//DFS inOrder
// console.log(tree.dfsInOrder());
//DFS inOrder
```

### Binary Heaps

- Very similary to Binary Tree, but with some different rules
- in Max Binary Heap parent nodes are always larger than the child nodes (EVERY LEVEL DOWN THE TREE)
- in Min Binary Heap parent nodes are always smaller than the child nodes

- In MBH the parent is greater than the child, but it's not guaranteed for the sibling nodes
- Binary heap is as compact as possible. All the children of each node are as full as they can be and left children are filled out first

- Binary Heaps in arrays: for any index of an array n, the left child is stored at 2n+1, the right child is stored at 2n+2 (i)

- For any child node at index n, its parent is at index Math.floor((n-1)/2)

- Priority queue, naive: iterate through the list of items with set priority, compare them and decide which one has higher priority (1 > 5) for example

- Priority queue can be implemented in many ways, but most commonly with the HEAP, it is just an abstract concept

- Big O: Insertion/Removal O(log n), Search O(n )

```javascript
class MaxBinaryHeap {
  constructor() {
    this.values = [72, 24, 15, 10, 7, 5];
  }

  swap(arr, idx1, idx2) {
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }

  insert(value) {
    // add to the end
    this.values.push(value);

    // bubble it up
    let i = this.values.length - 1;

    while (i > 0) {
      let parentIndex = Math.floor((i - 1) / 2);
      // if node value is less then the parent value, break
      if (this.values[i] <= this.values[parentIndex]) break;
      // otherwise swap the parent and the value
      this.swap(this.values, parentIndex, i);

      i = parentIndex;
    }
  }

  extractMax() {
    // remove the root
    // replace with the most recently added (the last one)
    // Adjust (sink down) - procedure for deleting the root from the heap,
    // and restoring the properties of the heap (down-heap)

    const max = this.values[0];
    // edge case, when the heap has 1 item only
    if (this.values.length === 1) {
      this.values.pop();
      return max;
    }

    const end = this.values.pop();
    this.values[0] = end;
    this.sinkDown();
    return max;
  }

  sinkDown() {
    let i = 0;
    const length = this.values.length;
    const elementToSink = this.values[0];

    while (true) {
      const leftChildIndex = 2 * i + 1;
      const rightChildIndex = 2 * i + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > elementToSink) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (!swap && rightChild > elementToSink) ||
          (swap && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.swap(this.values, i, swap);

      i = swap;
    }
  }
}

// PRIORITY QUEUE
class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  swap(arr, idx1, idx2) {
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let i = this.values.length - 1;
    const element = this.values[i];

    while (i > 0) {
      let parentIndex = Math.floor((i - 1) / 2);
      let parent = this.values[parentIndex];

      if (element.priority <= parent.priority) break;

      this.swap(this.values, parentIndex, i);
      i = parentIndex;
    }
  }

  dequeue() {
    const max = this.values[0];
    // edge case, when the heap has 1 item only
    if (this.values.length === 1) {
      this.values.pop();
      return max;
    }

    const end = this.values.pop();
    this.values[0] = end;
    this.sinkDown();
    return max;
  }

  sinkDown() {
    let i = 0;
    const length = this.values.length;
    const elementToSink = this.values[0];

    while (true) {
      const leftChildIndex = 2 * i + 1;
      const rightChildIndex = 2 * i + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild.priority > elementToSink.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (!swap && rightChild.priority > elementToSink.priority) ||
          (swap && rightChild.priority > leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.swap(this.values, i, swap);

      i = swap;
    }
  }
}

const heap = new MaxBinaryHeap();

//INSERT
// heap.insert(52);
//INSERT

//EXTRACT MAX
// heap.extractMax();
//EXTRACT MAX

// console.log(heap);

// PRIORITY QUEUE
const priorityQueue = new PriorityQueue();
priorityQueue.enqueue("headache", 1);
priorityQueue.enqueue("exploded head", 5);
priorityQueue.enqueue("cut", 3);
priorityQueue.enqueue("cold", 2);
// PRIORITY QUEUE

// console.log(priorityQueue);
```

### Hash Tables / Hash Map

- Extremely commonly used
- Hash tables are used to store key-value pairs
- keys are not ordered
- Hast tables are FAST, finding, removing, adding
- Nearly every programming lang has some sort of hast table
- in JS objects are basically hast maps, but have some restrictions
- To implement a hash table we are using array in this example
- in order to look up values by key, we need a way to convert keys into valid array indices
- a function that performs that task is called hash function

- What makes the good hash?

1. it should be fast -> O(1)
2. distributes uniformly, doesn't cluster outputs at specific indices
3. Should be pseudo-random
4. should be deterministic (same input yields same output)

- How to solve collision problem?

1. Separate Chaining: at each index, if we have collisions, we store data with yet another structure, array or ll (joint store them) (allows to store more than arr.length items)
2. Linear probing: when find a collision, we search through array for the next empty slot (store only arr.length items)

- Insertion/Deletion/Access -> O(1)
- Searching -> key O(1), val O(n)

- Cryptographically secured hash function have different rules

```javascript
function hash(key, arrayLen) {
  let total = 0;
  for (let char of key) {
    let value = char.charCodeAt(0) - 96;
    total = (total + value) % arrayLen;
  }

  return total;
}
// problems: only hashes strings
// not constant time
// data can be clustered relatively easily

function hashImproved(key, arrayLen) {
  let total = 0;
  const WEIRD_PRIME = 31;

  // restrict for 100 iterations max
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];

    let value = char.charCodeAt(0) - 96;
    total = (total * WEIRD_PRIME + value) % arrayLen;
  }

  return total;
}

class Hash {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;

    // restrict for 100 iterations max
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];

      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }

    return total;
  }

  set(key, val) {
    // accept val/key
    // hash key
    const idx = this._hash(key);

    // if no data, create an array
    if (!this.keyMap[idx]) {
      this.keyMap[idx] = [];
    }

    // push value to an array
    this.keyMap[idx].push([key, val]);
  }

  get(key) {
    const idx = this._hash(key);

    if (this.keyMap[idx]) {
      const arrayOfKeyValArrays = this.keyMap[idx];

      for (let i = 0; i < arrayOfKeyValArrays.length; i++) {
        if (arrayOfKeyValArrays[i][0] === key) {
          console.log(arrayOfKeyValArrays[i]);
        }
      }
    }

    console.log(undefined);
  }

  keys() {
    // returns all the unique keys
    const result = [];

    for (let prop of this.keyMap) {
      if (prop) {
        for (let i = 0; i < prop.length; i++) {
          result.push(prop[i][0]);
        }
      }
    }
    return Array.from(new Set(result));
  }

  vals() {
    // returns all unique vals
    const valuesArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i]; j++) {
          const value = this.keyMap[i][j][1];

          if (!valuesArr.includes(value)) {
            valuesArr.push(value);
          }
        }
      }
    }
  }
}

const hashMap = new Hash();

// SET
hashMap.set("darkblue", "#00008b");
hashMap.set("darkblue", "#00008b");
hashMap.set("salmon", "#fa8072");
// SET

// // GET
// hashMap.get("darkblue");
// // GET

// //KEYS
// hashMap.keys();
// //KEYS
```

### Graphs

- Graph is a collection of nodes and connections between those nodes
- Uses for graphs: Social networks, location/mapping, routing algs, visual hierarchy,

- Vertex: node
- Edge: connection between nodes
- Weighted/UnWeighted: values assigned to distances between vertices. Each edge has a value associated with it
- Directed/Undirected: directions assigned to distances between vertices. Represents the polarity of the edge

- Representing Graphs:

1. Adjacency list: can take up less space (in sparse graphs), faster to iterate over all edges, can be slower to lookup specific edge
2. Adjacency matrix: takes up more space (in sparse graphs), slower to iterate over all edges, faster to lookup specific edge

### Graph Traversal

- What is traversing the graph: visiting, updating, checking
- Uses: recommendations, web search (in the early days), gps navigation, AI (shortest path to win the game), solving mazes, peer to peer networking
- Depth first search in graphs means moving away from the root vertex
- Breadth first search means visiting siblings first, then moving away

```javascript
// Representing Graphs
// Adjacency list
class Graph {
  // undirected graph
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);

    this.adjacencyList[v2].push(v1);
  }

  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (edge) => edge !== v2
    );

    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (edge) => edge !== v1
    );
  }

  removeVertex(v) {
    let edges = this.adjacencyList[v];
    for (let i = 0; i < edges.length; i++) {
      this.removeEdge(v, edges[i]);
    }
    delete this.adjacencyList[v];
  }

  depthFirsRecursive(vertex) {
    const resultsList = [];
    const visited = {};

    const dfsHelper = (vertex) => {
      const edges = this.adjacencyList[vertex];

      if (edges.length === 0) return null;
      visited[vertex] = true;
      resultsList.push(vertex);

      edges.forEach((edge) => {
        if (!visited[edge]) {
          return dfsHelper(edge);
        }
      });
    };

    dfsHelper(vertex);

    return resultsList;
  }

  depthFirstIteratively(start) {
    const resultsList = [];
    const visited = {};
    // LIFO
    const pseudoStack = [start];
    let vertex;

    const dfsHelper = () => {
      while (pseudoStack.length) {
        vertex = pseudoStack.pop();

        if (!visited[vertex]) {
          visited[vertex] = true;
          resultsList.push(vertex);

          this.adjacencyList[vertex].forEach((edge) => {
            pseudoStack.push(edge);
          });
        }
      }
    };

    dfsHelper();
    return resultsList;
  }

  breadthFirst(start) {
    // FIFO
    const pseudoQueue = [start];
    const resultsList = [];
    const visited = {
      [start]: true,
    };

    let currentVertex;

    const bfsHelper = () => {
      while (pseudoQueue.length) {
        currentVertex = pseudoQueue.shift();
        resultsList.push(currentVertex);

        this.adjacencyList[currentVertex].forEach((edge) => {
          if (!visited[edge]) {
            visited[edge] = true;
            pseudoQueue.push(edge);
          }
        });
      }
    };

    bfsHelper();

    return resultsList;
  }
}

const g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

console.log(g);

console.log(g.depthFirsRecursive("A"));

console.log(g.depthFirstIteratively("A"));

console.log(g.breadthFirst("A"));
```
