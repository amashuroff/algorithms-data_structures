// O(n)
function linearSearch(nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) return i;
  }

  return -1;
}

// O(log n)
function binarySearch(sortedArr, val) {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    let middle = Math.floor((right + left) / 2);
    if (sortedArr[middle] === val) {
      return middle;
    } else if (sortedArr[middle] < val) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 2));

// Naive string search - O(n^2)
function naiveStringSearch(str, target) {
  // loop over the str
  // remember current index
  // match acts as a checker
  for (let i = 0; i < str.length; i++) {
    let match = 0;
    let currentI = i;

    // loop over the target str
    // if match, increment match by 1
    // increment str's index by one to check the next character
    for (let j = 0; j < target.length; j++) {
      if (str[currentI] !== target[j]) {
        break;
      }
      match++;
      currentI++;
    }

    if (match === target.length) return true;
  }

  return false;
}

// console.log(naiveStringSearch("wowzomg", "omg"));

// Naive approach-2 O(n^2)
function naiveStringSearch2(str, subStr) {
  let count = 0;
  //loop over the long string and stop if the remaining string after i is smaller than the small string
  for (let i = 0; i < str.length && str.length - i >= subStr.length; i++) {
    //check if the first character of the short string is the same as the current one in the long string
    //then if true slice the long string to give a word with the same length as the small string
    //then compare this string to the small string
    //if all of this is true then increment
    if (str[i] === subStr[0] && str.slice(i, i + subStr.length) === subStr)
      count++;
  }
  return count;
}

// Naive approach instructor O(n^2)
function naiveStringSearch3(str, subStr) {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < target.length; j++) {
      // add j to i to get the next char in str
      if (target[j] !== str[i + j]) {
        break;
      }

      if (j === target.length - 1) {
        count++;
      }
    }
  }

  return count;
}
