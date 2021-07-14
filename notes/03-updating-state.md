# Updating state

## Slides

- State, Actions
- Use Function
- Function takes 2 arguments
- Returns new state
- Pure Functions

## Pure Functions Examples

```js
// `square()` is a pure function

const square = x => x * x;
```

```js
// `calculateTip()` is an impure function

const tipPercentage = 0.15;

const calculateTip = cost => cost * tipPercentage;
```

```js
const calculateTip = (cost, tipPercentage = 0.15) => cost * tipPercentage;
```

## Define the `todos` function

```js
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.payload]);
  }

  return state;
}
```

- This function is called as reducer

## Show slide - action, reducer, state

## Add dispatch action

```diff
+   const dispatch = (action) => {
+     state = todos(state, action);
+     listeners.forEach((listener) => listener());
+   }

    return {
      getState,
      subscribe,
+     dispatch,
    };
```

## Library & App Code

```diff
+ // Library Code
  function createStore(reducer) {
    // The store should have four parts


+ // App Code
  function todos(state = [], action) {
    if (action.type === 'ADD_TODO') {


+  const store = createStore(todos)
```