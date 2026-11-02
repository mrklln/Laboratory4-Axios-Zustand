import Todolist from '../components/Todolist'
import { useEffect, useState } from "react";
import axios from "axios";
import { useTodoStore } from '../store/useTodoStore'

function Home() {
    const [users, setUsers] = useState([]);//the users loaded from the API

    const [loading, setLoading] = useState(true);// true while the data is still loading

    const [error, setError] = useState(null); //stores the error message if the request fails

    const groups = useTodoStore((s) => s.groups) //list of groups

    const tasks = useTodoStore((s) => s.tasks) //list of all tasks

    const addTask = useTodoStore((s) => s.addTask) //adds a new task

    const toggleTask = useTodoStore((s) => s.toggleTask) //marks a task done or not done

    const deleteTask = useTodoStore((s) => s.deleteTask) //removes a task by its id


    useEffect(() => {//axios fetching data
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/users?limit=6')
                setUsers(response.data.users)
            } 
            catch (err) {//catch any error that occurs during the request
                setError(err.message)
                console.log(error)
            }
            finally { //finally block is executed after try and catch, regardless of the result
                setLoading(false)
            }
        }
        getData()//fetch the data from the API
    }, [])
    console.log(users)//show the users in the console

    return (
        <div className="w-full max-w-6xl mx-auto gap-4 md:gap-6 items-start">
             <h1 className="text-3xl font-bold mb-2 text-center text-white">Welcome to the To-Do App! 👋</h1>
             <p className="text-slate-300 italic max-w-xl mx-auto text-center mb-5">
                Plan your day, organize tasks into groups, 
                and track your progress, all in one place. 
                Add a task below to get started.
             </p>
            <div className="w-full md:flex-1 *:w-full">
                <Todolist groups={groups} tasks={tasks} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask}/>
            </div>
            
            {/*This is the axios section for the sample users*/}
            
            <h1 className="font-bold text-lg mb-1 text-white"> Users</h1>
            <p className="text-gray-500 text-sm mb-2">Loaded from DummyJSON using Axios.</p>

            {/* message while loading */}
            {
            loading && <p className="text-gray-500">Loading users...</p>
            }
            {/* message if the request failed */}
            {
            error && <p className="text-red-600">Couldn't load users: {error}</p>
            }

            {/* list of users */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {users.map((u) => (
                    <li key={u.id} className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                        <img src={u.image} alt="" className="w-10 h-10 rounded-full bg-gray-200" />
                        <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate">
                                {u.firstName} {u.lastName}
                            </p>
                            <p className="text-sm text-gray-600 truncate">{u.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home