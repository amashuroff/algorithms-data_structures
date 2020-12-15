## Sorting Algorithms

- Sorting is rearranging items in a collection so that the items are in sime kind of order

---

### Bubble sort / Insertion sort / Selection sort

- all are roughly the same
- all have avg time complexity: quadratic

### Merge sort - O(n log n)

- combination of sorting and merging
- split all the numbers in solo arrays
- merge and sort

### Quick sort

- as merge sort, takes advantage of knowing that arrays of [] or [1] are always sorted
- works by selecting pivot, and moving all the numbers that are greater then that number to the right, and all the numbers that are less then that number to the right
- selecting a pivot is an important part, The runtime of quick sort depends on how one selects the pivot, ideally (median value)
