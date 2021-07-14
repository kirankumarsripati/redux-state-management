# Create Store: Getting and Listening

- Create index.js with `createStore()`

```ts
function createStore() {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state;

  const getState = () => state;

  return {
    getState,
  }
}
```

- A way to subscribe to state

```ts
const store = createStore();
store.subscribe(() => {
  console.log(`The new state is: ${store.getState()}`);
})
store.subscribe(() => {
  console.log(`The new changed`);
})
```

- Implement subscribe logic

```diff
   let state;
+  let listeners = [];

   const getState = () => state;

+  const subscribe = (listener: Function) => {
+    listeners.push(listener);
+  }

   return {
     getState,
+    subscribe,
   }
```

- A way to unsubscribe

```diff
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
+     return () => {
+       listeners = listeners.filter((l) => l !== listener);
+     }
  }

- store.subscribe(() => {
+ const unsubscribe = store.subscribe(() => {
    console.log(`The new changed`);
  })
+ unsubscribe();
```

- Remove all the example code

```diff
-  const store = createStore();
-  store.subscribe(() => {
-    console.log(`The new state is: ${store.getState()}`);
-  })
-  const unsubscribe = store.subscribe(() => {
-    console.log(`The new changed`);
-  })
-  unsubscribe();
```

- For updating state we should have some strict rules

- For example - [https://todomvc.com/examples/angular2/](https://todomvc.com/examples/angular2/)
