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
