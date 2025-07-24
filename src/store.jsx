import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension'
import {thunk} from 'redux-thunk'
const ADD_TASK = 'task/add'
const DELETE_TASK = 'task/delete'
const FETCH_TASK ="task/fetch";
const initialState = {
    task: [],
}

const taskReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_TASK:
            return{
                ...state, 
                task:[...state.task, action.payload]
            }
        case DELETE_TASK:
            const updatedTask = state.task.filter((currTask, index) =>{
                return index !== action.payload
            })
            return{
                ...state,
                task:updatedTask,
            }
        case FETCH_TASK:
            return {
                ... state,
                task:[...state.task, ...action.payload]
            }
        default:
            return state;
    }
}

//step 2 : create the redux store using the reducer

// export const store = createStore(taskReducer, composeWithDevTools());
export const store = createStore(taskReducer, composeWithDevTools(applyMiddleware(thunk)));
console.log(store);



//step 5: create action creators

export const addTask = (data) =>{
    return {type : ADD_TASK, payload:data}
}

export const deleteTask = (id) =>{
    return{
        type: DELETE_TASK, payload:id
    }
}

export const fetchTask = () =>{
    return async(dispatch) =>{
        try{
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
            const tasks = await res.json()
            dispatch({type:FETCH_TASK, payload:tasks.map((currTask) =>{
                return currTask.title
            })})
        }
        catch(error){
            console.log(error)
        }
    }
}

//step 3 : log the initial state
console.log('initial state  ', store.getState());

// store.dispatch({type: ADD_TASK, payload: "Buy thapa technical code"});
store.dispatch(addTask('Buy Mango from deba'))

store.dispatch(addTask('Buy apple'))

store.dispatch(addTask('Buy banana'))

console.log('updated state : ',store.getState());

store.dispatch({type: ADD_TASK, payload:"Buy mango again"});

console.log('updated state :',store.getState())

// store.dispatch({type: DELETE_TASK, payload:1});
store.dispatch(deleteTask(1))
console.log('deleted state', store.getState());

