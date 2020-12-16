function pivotHelper(arr, start = 0, end = arr.length - 1) {
  function swap(arr, idx1, idx2) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  let pivotIndex = start; // where to swap at the end

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < arr[start]) {
      pivotIndex++;
      swap(arr, pivotIndex, i);
    }
  }

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
