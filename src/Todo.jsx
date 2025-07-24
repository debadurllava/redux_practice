import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTask } from "./store";
import { useState } from "react";


export const Todo = () =>{

    const [tasks, setTasks] = useState("")
    const task = useSelector((state) => state.task);
    console.log('react state',task)
    const dispatch = useDispatch();


    const handleFromSubmit = (e)=>{
        e.preventDefault();
        setTasks("")
        return dispatch(addTask(tasks))
    }

    const handleFetchTasks =()=>{
        dispatch(fetchTask())
    }
    const handleTaskDelete = (id)=>{
        return dispatch(deleteTask(id))

    }
    return(
        <div>
            <div>
                <h1>
                    To-do List
                </h1>
                <div>
                    <form onSubmit={handleFromSubmit}>
                        <input type="text" id="input-box" placeholder="Add a new task"
                        value={tasks} onChange={(event) =>setTasks(event.target.value) } />
                        <button>Add Task</button>
                    </form>
                </div>

                <button onClick={handleFetchTasks}>Fetch Task</button>
                <ul>
                {
                    task.map((currTask, index) =>{
                        return(
                            <li key={index} style={{display:"flex"}}> 
                                <p>{index}:{currTask}</p>
                                <button onClick={() => handleTaskDelete(index)}>delete</button>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
}