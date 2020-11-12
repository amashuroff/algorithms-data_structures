// Function accepts 2 params: array of positive integers and a positive integer
// The function should return the minimal length of a contiguous subarray
// of which the sum is greater than or equal to the integer passed to the function.
// if there is no one, return 0

function minSubArrayLen(arr, num) {
  let subArrSum = 0;
  let subArr = [];

  for (let i = 0; i < arr.length; i++) {
    subArrSum += arr[i];
    if (subArrSum < num) {
      subArr.push(arr[i]);
    } else {
      return subArr.length;
    }
  }
  return 0;
}

// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7));
// console.log(minSubArrayLen([2, 1, 6, 5, 4], 9));
// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7));
// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 18));
// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 4));
// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7));
