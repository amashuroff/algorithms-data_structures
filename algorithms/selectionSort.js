function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // remember the index at the start of the array iteration
    // [123]
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
