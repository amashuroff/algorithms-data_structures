class MaxBinaryHeap {
  constructor() {
    this.values = [72, 24, 15, 10, 7, 5];
  }

  swap(arr, idx1, idx2) {
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }

  insert(value) {
    // add to the end
    this.values.push(value);

    // bubble it up
    let i = this.values.length - 1;

    while (true) {
      let parentIndex = Math.floor((i - 1) / 2);
      // if node value is less then the parent value, break
      if (this.values[i] <= this.values[parentIndex]) break;
      // otherwise swap the parent and the value
      this.swap(this.values, parentIndex, i);

      i = parentIndex;
    }
  }

  extractMax() {
    // remove the root
    // replace with the most recently added (the last one)
    // Adjust (sink down) - procedure for deleting the root from the heap,
    // and restoring the properties of the heap (down-heap)

    const max = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;
    this.sinkDown();
    return max;
  }

  sinkDown() {
    let i = 0;
    const length = this.values.length;
    const elementToSink = this.values[0];

    while (true) {
      const leftChildIndex = 2 * i + 1;
      const rightChildIndex = 2 * i + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild > elementToSink) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];
        if (
          (!swap && rightChild > elementToSink) ||
          (swap && rightChild > leftChild)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;

      this.swap(this.values, i, swap);

      i = swap;
    }
  }
}

const heap = new MaxBinaryHeap();

//INSERT
// heap.insert(52);
//INSERT

//EXTRACT MAX
heap.extractMax();
//EXTRACT MAX

console.log(heap);
