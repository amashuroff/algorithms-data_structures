## Recursion

---

### What is Recursion?

- A process that calls itself (function)

### It is everywhere!

- JSON.parse / JSON.stringify
- document.getElementById, and DOM traversal algorithms
- Object traversal
- More complex data structures
- Sometimes it is a cleaner alternative solution

### The Call stack

- Anytime function is invoked, its pushed to the top of the stack
- Anytime JS engine sees return keyword or function ends the compiler will remove it from the stack (pop it)

### Two essential parts of a recursive function

- Base case, where recursive calls stop
- Different input

### Where things go wrong

- No base case
- Forgetting to return or return the wrong value
- STACK OVERFLOW!!!

## HELPER METHOD RECURSION PATTERN

- using recursive function of a function that was declared in another function (helper)

## PURE RECURSION TIPS

- use slice, spread and concat that make copies of arrays so you don't mutate them
- strings are immutable, so use slice, sbstr, or substring to make copies of strings
- to make copies of objects use Object.assign or spread operator.
