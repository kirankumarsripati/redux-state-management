# Manage more state

## Add more actions

```js
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.payload]);
  } else if (action.type === 'REMOVE_TODO') {
    return state.filter((todo) => todo.id !== action.payload.id);
  } else if (action.type === 'TOGGLE_TODO') {
    return state.map((todo) => {
      return todo.payload.id !== action.payload.id ? todo : {
        ...todo,
        completed: !todo.completed,
      }
    });
  } else {
    return state;
  }
}
```

## Refactor to switch case

```js
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.payload]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        return todo.payload.id !== action.payload.id ? todo : {
          ...todo,
          completed: !todo.completed,
        }
      });
    default:
      return state;
  }
}
```

## Another reducer for goals

```js
function goals(state = [], action) {
  switch (action.type) {
    case 'ADD_GOAL':
      return state.concat([action.payload]);
    case 'REMOVE_GOAL':
      return state.filter((goal) => goal.id !== action.payload.id);
    default:
      return state;
  }
}
```