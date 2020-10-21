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
