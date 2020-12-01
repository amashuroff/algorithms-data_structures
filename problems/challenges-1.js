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
