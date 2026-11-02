import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTodoStore } from '../store/useTodoStore'

function GroupTask() {
    const { groupId } = useParams() //retrieve groupId from URL parameters using useParams hook from react-router-dom
    const [title, setTitle] = useState('')

    const groups = useTodoStore((s) => s.groups)// get the list of groups from the store
    const tasks = useTodoStore((s) => s.tasks)// get the list of all tasks from the store
    const addTask = useTodoStore((s) => s.addTask)// function that adds a new task 
    const toggleTask = useTodoStore((s) => s.toggleTask)// function that switches a task between done and not done
    const deleteTask = useTodoStore((s) => s.deleteTask)// function that removes a task by its id

    const group = groups.find((g) => g.id === groupId) //find the group that matches the id

    if (!group) {
        return (
            <p className="text-white text-center">
                Group not found.{' '}
                <Link to="/groups" className="underline">Back to groups</Link>
            </p>
        )
    }

    const groupTasks = tasks.filter((t) => t.groupId === groupId) // display the tasks that belong to the group with the matching groupId

    //add new task, ignore it if the input is empty
    const handleAdd = () => {
        if (!title.trim()) return
        addTask(title.trim(), groupId) 
        setTitle('')
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Link to="/groups" className=" text-white">← Back to groups</Link>
            <h1 className="text-2xl font-bold my-3 text-white!">{group.name}</h1>

            <div className="flex gap-2 mb-4">
                <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="Add a task..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white text-black"/>
                <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
                    Add Task
                </button>
            </div>

            {groupTasks.length === 0 && (
                <p className="text-slate-300 text-center">No tasks in this group yet.</p>
            )}

            {/* list of tasks */}
            <ul className="space-y-2">
                {groupTasks.map((t) => (
                    <li key={t.id} className="bg-white/10 rounded-xl p-3 flex justify-between items-center">
                        <span className={t.done ? 'line-through text-slate-400' : 'text-white'}>
                            {t.title} <small>({t.done ? 'Done' : 'Not Done'})</small>
                        </span>
                        <span className="flex gap-2">
                            <button onClick={() => toggleTask(t.id)} className="px-3 py-1 rounded-lg bg-green-600 text-white">
                                {t.done ? 'Undo' : 'Done'}
                            </button>
                            <button onClick={() => { if (window.confirm("Delete this task?")) deleteTask(t.id)}} className="px-3 py-1 rounded-lg bg-red-600 text-white">
                                Delete
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GroupTask