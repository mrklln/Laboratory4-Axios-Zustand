import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTodoStore } from '../store/useTodoStore'

function Groups() {
    const [name, setName] = useState('')

    const groups = useTodoStore((s) => s.groups)//list of groups
    const addGroup = useTodoStore((s) => s.addGroup)//adds a new group
    const deleteGroup = useTodoStore((s) => s.deleteGroup)//removes a group (and its tasks)

    // add a new group, ignore it if the input is empty
    const handleAdd = () => {
        if (!name.trim()) return
        addGroup(name.trim())
        setName('')
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4 text-white!">Task Groups</h1>

            <div className="flex gap-2 mb-4">
                <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    placeholder="New group (e.g. School Activities)"
                    className="flex-1 px-3 py-2 rounded-lg bg-white text-black"/>
                <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-blue-500 text-white cursor-pointer">
                    Add Group
                </button>
            </div>

            {groups.length === 0 && (
                <p className="text-slate-300 text-center">No groups yet. Create one above.</p>
            )}
            
            {/* list of groups */}
            <ul className="space-y-2">
                {groups.map((g) => (
                    <li key={g.id} className="bg-white/10 rounded-xl p-4 flex justify-between items-center">
                        <span className="text-white">{g.name}</span>
                        <span className="flex gap-2">
                            <Link to={`/groups/${g.id}`} className="px-3 py-1 rounded-lg bg-blue-500 text-white">
                                Open
                            </Link>
                            <button onClick={() => { if (window.confirm("Delete this task?")) deleteGroup(g.id)}} className="px-3 py-1 rounded-lg bg-red-600 text-white cursor-pointer">
                                Delete
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Groups