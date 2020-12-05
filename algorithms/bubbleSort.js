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
