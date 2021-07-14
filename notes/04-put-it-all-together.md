# Put it all together

```js
store.subscribe(() => {
  console.log(`The new state is: `, store.getState());
});

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 0,
    name: 'Learn Redux',
    completed: false,
  }
});
```