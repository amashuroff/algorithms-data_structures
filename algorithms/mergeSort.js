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
