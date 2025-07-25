
console.log(store.dispatch(addTask('Buy Mango')))
console.log(store.dispatch(addTask('Buy Apple')))
console.log('initial state  ', store.getState());
console.log(store.dispatch(deleteTask(1)))

