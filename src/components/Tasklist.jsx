  function Tasklist({ task, onToggle, onDelete }) {
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
        <div className="flex gap-2">
            {/* done / undo button */}
          <button className={`${task.done ? "bg-yellow-500" : "bg-green-500"} cursor-pointer  text-white px-2 py-1 rounded`} onClick={() => onToggle(task.id)}>
            {task.done ? "Undo" : "Done"}
          </button>

            {/* delete button, asks for confirmation first */}
          <button className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer" onClick={() => { if (window.confirm("Delete this task?")) onDelete(task.id)}}>
            Delete
          </button>
        </div>
      </li>
    );
  }

  export default Tasklist;