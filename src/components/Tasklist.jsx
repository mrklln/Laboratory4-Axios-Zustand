import { useState } from "react"

// shows one task in the list
function Tasklist({ task, groups = [], onToggle, onDelete, onAssign }) {
    const [assigning, setAssigning] = useState(false); // true while the group dropdown is open

    return (
      <li className="flex flex-wrap justify-between items-center gap-2 bg-white border border-gray-400 rounded px-3 py-1">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          {/* task text, crossed out if done */}
          <span className={`wrap-break-word min-w-0 ${task.done ? "line-through text-gray-400" : ""}`}>
            {task.text}
            {/* show the group name only if the task has a group */}
            {task.groupName && (
              <>
                <span className="mx-1">-</span>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-black font-bold text-lg no-underline inline-block">
                  {task.groupName}
                </span>
              </>
            )}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">

          {/* assign button: only for tasks that have no group, and only if a group exists */}
          {!task.groupName && groups.length > 0 && (
            assigning ? (
              <>
                {/* pick a group, the task moves into it right away */}
                <select defaultValue="" onChange={(e) => {
                    if (e.target.value) onAssign(task.id, e.target.value)
                    setAssigning(false)
                  }}
                  className="border border-gray-400 rounded px-2 py-1">
                  <option value="" disabled>Select group...</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                <button className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded cursor-pointer" onClick={() => setAssigning(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-2 py-1 rounded cursor-pointer" onClick={() => setAssigning(true)}>
                Assign
              </button>
            )
          )}

          {/* done / undo button */}
          <button className={`${task.done ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"} transition cursor-pointer text-white px-2 py-1 rounded`} onClick={() => onToggle(task.id)}>
            {task.done ? "Undo" : "Done"}
          </button>

          {/* delete button, asks for confirmation first */}
          <button className="bg-red-500 hover:bg-red-600 transition text-white px-2 py-1 rounded cursor-pointer" onClick={() => { if (window.confirm("Delete this task?")) onDelete(task.id)}}>
            Delete
          </button>
        </div>
      </li>
    );
  }

  export default Tasklist;