import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTodoStore } from '../store/useTodoStore'

// dashboard page: progress overview, task statistics, recent tasks, group progress, and users from the API
function Dashboard() {
    const [users, setUsers] = useState([]) // the users loaded from the API
    const [loading, setLoading] = useState(true) // true while the users are loading
    const [error, setError] = useState(null) // error message if the request fails

    // get the data and functions from the store
    const groups = useTodoStore((s) => s.groups) //list of groups
    const tasks = useTodoStore((s) => s.tasks) //list of all tasks
    const toggleTask = useTodoStore((s) => s.toggleTask) //marks a task done or not done
    const deleteTask = useTodoStore((s) => s.deleteTask) //removes a task by its id

    // task statistics, they update automatically when the store changes
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((t) => t.done).length
    const pendingTasks = totalTasks - completedTasks
    const percentDone = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

    // values for the circle progress
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentDone / 100) * circumference

    // the 5 newest tasks, newest first
    const recentTasks = [...tasks].reverse().slice(0, 5)

    // find the group name using the group id
    const getGroupName = (groupId) => groups.find((g) => g.id === groupId)?.name

    // runs once when the page loads, gets 4 users from the API
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/users?limit=4')
                setUsers(response.data.users)
            } catch (err) {
                setError(err.message) // save the error message to show it on the page
            } finally {
                setLoading(false) // stop loading whether it worked or failed
            }
        }
        getData()
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto space-y-5">
            {/* header: welcome message on the left, progress circle on the right */}
            <div className="bg-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
                    <p className="text-slate-300 mb-4">
                        Welcome! Here is a quick look at your tasks and groups.
                    </p>
                    {/* navigation buttons */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <Link to="/home" className="px-4 py-2 rounded-full bg-blue-500 text-white">To-Do List</Link>
                        <Link to="/groups" className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20">Groups</Link>
                        <Link to="/userguide" className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20">User Guide</Link>
                        <Link to="/about" className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20">About</Link>
                    </div>
                </div>

                {/* circle that shows the percent of tasks done */}
                <div className="relative w-32 h-32 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
                        <circle
                            cx="50" cy="50" r={radius} fill="none" stroke="#22c55e" strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span className="text-2xl font-bold">{percentDone}%</span>
                        <span className="text-xs text-slate-300">done</span>
                    </div>
                </div>
            </div>

            {/* statistics: three strips with a colored left border */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white/10 border-l-4 border-blue-500 rounded-xl px-4 py-3 flex justify-between items-center">
                    <span className="text-slate-300">Total tasks</span>
                    <span className="text-2xl font-bold text-white">{totalTasks}</span>
                </div>
                <div className="bg-white/10 border-l-4 border-green-500 rounded-xl px-4 py-3 flex justify-between items-center">
                    <span className="text-slate-300">Completed</span>
                    <span className="text-2xl font-bold text-white">{completedTasks}</span>
                </div>
                <div className="bg-white/10 border-l-4 border-yellow-500 rounded-xl px-4 py-3 flex justify-between items-center">
                    <span className="text-slate-300">Pending</span>
                    <span className="text-2xl font-bold text-white">{pendingTasks}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* recent tasks */}
                <div className="bg-white/10 rounded-2xl p-5">
                    <h2 className="text-white font-bold text-lg mb-3">Recent tasks</h2>

                    {/* message when there are no tasks */}
                    {recentTasks.length === 0 && <p className="text-slate-300 italic">No tasks yet.</p>}

                    <ul className="space-y-2">
                        {recentTasks.map((t) => (
                            <li key={t.id} className="flex items-center justify-between gap-2 bg-white/10 rounded-lg px-3 py-2">
                                <div className="min-w-0">
                                    {/* task title, crossed out if done */}
                                    <p className={`truncate ${t.done ? 'line-through text-slate-400' : 'text-white'}`}>{t.title}</p>
                                    {/* show the group name only if the task has a group */}
                                    {getGroupName(t.groupId) && (
                                        <p className="text-xs text-blue-300">{getGroupName(t.groupId)}</p>
                                    )}
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    <button onClick={() => toggleTask(t.id)} className={`px-2 py-1 text-sm rounded text-white cursor-pointer ${t.done ? 'bg-yellow-500' : 'bg-green-600'}`}>
                                        {t.done ? 'Undo' : 'Done'}
                                    </button>
                                    <button
                                        onClick={() => { if (window.confirm('Delete this task?')) deleteTask(t.id) }}
                                        className="px-2 py-1 text-sm rounded bg-red-600 text-white cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* progress of each group */}
                <div className="bg-white/10 rounded-2xl p-5">
                    <h2 className="text-white font-bold text-lg mb-3">Group progress</h2>

                    {/* message when there are no groups */}
                    {groups.length === 0 && <p className="text-slate-300 italic">No groups yet.</p>}

                    <ul className="space-y-4">
                        {groups.map((g) => {
                            const groupTasks = tasks.filter((t) => t.groupId === g.id)
                            const groupDone = groupTasks.filter((t) => t.done).length
                            const groupPercent = groupTasks.length === 0 ? 0 : Math.round((groupDone / groupTasks.length) * 100)
                            return (
                                <li key={g.id}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <Link to={`/groups/${g.id}`} className="text-white hover:underline">{g.name}</Link>
                                        <span className="text-slate-300">{groupDone}/{groupTasks.length}</span>
                                    </div>
                                    {/* progress bar of the group */}
                                    <div className="w-full bg-white/15 rounded-full h-2">
                                        <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${groupPercent}%` }} />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            {/* users from the API */}
            <div className="bg-white/10 rounded-2xl p-5">
                <h2 className="text-white font-bold text-lg">Users</h2>
                <p className="text-slate-300 text-sm mb-3">Loaded from DummyJSON using Axios.</p>

                {/* message while loading */}
                {loading && <p className="text-slate-300">Loading users...</p>}

                {/* message if the request failed */}
                {error && <p className="text-red-400">Couldn't load users: {error}</p>}

                {/* user cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {users.map((u) => (
                        <div key={u.id} className="bg-white/10 rounded-xl p-3 text-center transition hover:scale-105">
                            <img src={u.image} alt="" className="w-14 h-14 rounded-full bg-gray-200 mx-auto mb-2" />
                            <p className="text-white font-medium truncate">{u.firstName} {u.lastName}</p>
                            <p className="text-xs text-slate-300 truncate">{u.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard