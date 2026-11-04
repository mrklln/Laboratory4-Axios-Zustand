import Todolist from '../components/Todolist'
import { useTodoStore } from '../store/useTodoStore'

// home page: the to-do list
function Home() {
    // get the data and functions from the store
    const groups = useTodoStore((s) => s.groups) //list of groups

    const tasks = useTodoStore((s) => s.tasks) //list of all tasks

    const addTask = useTodoStore((s) => s.addTask) //adds a new task

    const toggleTask = useTodoStore((s) => s.toggleTask) //marks a task done or not done

    const deleteTask = useTodoStore((s) => s.deleteTask) //removes a task by its id

    const assignTask = useTodoStore((s) => s.assignTask) //moves a task into a group

    return (
        <div className="w-full max-w-6xl mx-auto gap-4 md:gap-6 items-start">
            <h1 className="text-3xl font-bold mb-2 text-center text-white">My To-Do List ✅</h1>
            <p className="text-slate-300 italic max-w-xl mx-auto text-center mb-5">
                Add your tasks, mark them as done, and keep track of what is left. Open the Groups page to organize tasks by group.
            </p>
            <div className="w-full md:flex-1 *:w-full">
                <Todolist groups={groups} tasks={tasks} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} assignTask={assignTask} />
            </div>
        </div>
    )
}

export default Home