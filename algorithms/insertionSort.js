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
