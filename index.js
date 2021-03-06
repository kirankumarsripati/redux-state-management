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
const TODOS = {
  ADD_TODO: 'ADD_TODO',
  REMOVE_TODO: 'REMOVE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
}

const GOALS = {
  ADD_GOAL: 'ADD_GOAL',
  REMOVE_GOAL: 'REMOVE_GOAL',
}

// Action Creator
function addTodoAction(todo) {
  return {
    type: TODOS.ADD_TODO,
    payload: todo,
  }
}

function removeTodoAction(id) {
  return {
    type: TODOS.REMOVE_TODO,
    payload: { id },
  }
}

function toggleTodoAction(id) {
  return {
    type: TODOS.TOGGLE_TODO,
    payload: { id },
  }
}

function addGoalAction(goal) {
  return {
    type: GOALS.ADD_GOAL,
    payload: goal,
  }
}

function removeGoalAction(id) {
  return {
    type: GOALS.REMOVE_GOAL,
    payload: { id },
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case TODOS.ADD_TODO:
      return state.concat([action.payload]);
    case TODOS.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id);
    case TODOS.TOGGLE_TODO:
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
    case GOALS.ADD_GOAL:
      return state.concat([action.payload]);
    case GOALS.REMOVE_GOAL:
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

store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  completed: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Wash the bike',
  completed: false,
}));

store.dispatch(addTodoAction({
  id: 2,
  name: 'Go to the gym',
  completed: true,
}));

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux',
}));

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose weight',
}));

store.dispatch(removeGoalAction(0));
