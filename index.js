// Library Code
function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// App Code
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.payload]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'TOGGLE_TODO':
      return state.map((todo) => {
        return todo.id !== action.payload.id ? todo : {
          ...todo,
          completed: !todo.completed,
        }
      });
    default:
      return state;
  }
}

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

function app(state = {}, action){
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app);

store.subscribe(() => {
  console.log(`The new state is: `, store.getState());
});

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