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

console.log(fib(4)); // 3
// fib(10); // 55
// fib(28); // 317811
// console.log(fib(35)); // 9227465
