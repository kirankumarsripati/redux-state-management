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
      return todo.id !== action.payload.id ? todo : {
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

## Show Slides

- Multiple Reducers
- Reducer with actions
- Create store
- Create Store with root Reducer

## Add Root Reducer

```js
function app(state = {}, action){
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app);
```

## Add sample dispatch events

```js
store.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 0,
    name: 'Walk the dog',
    completed: false,
  }
});

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 1,
    name: 'Wash the bike',
    completed: false,
  }
});

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 2,
    name: 'Go to the gym',
    completed: true,
  }
});

store.dispatch({
  type: 'REMOVE_TODO',
  payload: {
    id: 1,
  }
});

store.dispatch({
  type: 'TOGGLE_TODO',
  payload: {
    id: 0,
  }
});

store.dispatch({
  type: 'ADD_GOAL',
  payload: {
    id: 0,
    name: 'Learn Redux',
  }
});

store.dispatch({
  type: 'ADD_GOAL',
  payload: {
    id: 1,
    name: 'Lose weight',
  }
});

store.dispatch({
  type: 'REMOVE_GOAL',
  payload: {
    id: 0,
  }
});
```