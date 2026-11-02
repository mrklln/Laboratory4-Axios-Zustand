import { useState } from "react"
import Tasklist from "./Tasklist"

function Todolist({ groups = [], tasks, addTask, toggleTask, deleteTask }) {
    const [text, setText] = useState(""); // React state stores the input, while setText updates its value.
                                          // the event handling is onClick, onKeyDown, and onChange. 

    const getGroupName = (groupId) => groups.find((g) => g.id === groupId)?.name; // find the group name using the group id

      // separate the tasks into not done and done
    const notDoneTasks = tasks.filter((t) => !t.done);
    const doneTasks = tasks.filter((t) => t.done);

    // add a new task, ignore it if the input is empty
    const handleAdd = () => {
        if (text.trim() !== "") {
            addTask(text.trim());
            setText("");
        }
    };

    const clearAll = () => {
        if(window.confirm("Clear all task? This will also remove your task on groups done or not.")){
            tasks.forEach((t) => deleteTask(t.id));
            setText("");
        }
    };

    const toItem = (task) => ({// Show the task of a group with the group name and the task name
        ...task,
        text:task.title,
        groupName: getGroupName(task.groupId)
    })

    return (
        <div className='bg-white rounded-xl w-full max-w-3xl mx-auto shadow-lg p-4 sm:p-6'>
            <h1 className='sm:text-2xl text-center font-bold'><span className="mr-2">📝</span>To-Do-List</h1>
            <p className='text-center text-sm italic'>Laboratory 3 with router</p>

            <div className="flex gap-2 mb-4">
                <input className="flex-1 min-w-0 border border-gray-400 rounded px-3 py-2" type="text" value={text} onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()} placeholder="Add a task..." />
                <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={handleAdd}>Add Task</button>
            </div>

            <div className="p-3 sm:p-4 mb-4">
                <h2 className="font-bold text-lg mb-2">Not Done ({notDoneTasks.length})</h2>
                {notDoneTasks.length === 0 ? (
                    <p className="text-gray-500 italic">No tasks to do.</p>
                ) : (
                    <ul className="space-y-2 max-h-44 overflow-y-auto pr-1">
                        {notDoneTasks.map((task) => (
                            <Tasklist key={task.id} task={ toItem(task) } onToggle={toggleTask} onDelete={deleteTask} />
                        ))}
                    </ul>
                )}
            </div>

            <div className="p-3 sm:p-4">
                <h2 className="font-bold text-lg mb-2">Done ({doneTasks.length})</h2>
                {doneTasks.length === 0 ? (
                    <p className="text-gray-500 italic">No completed tasks.</p>
                ) : (
                    <ul className="space-y-2 max-h-44 overflow-y-auto pr-1">
                        {doneTasks.map((task) => (
                            <Tasklist key={task.id} task={toItem(task)} onToggle={toggleTask} onDelete={deleteTask} />
                        ))}
                    </ul>
                )}
            </div>

            {tasks.length > 0 && (
                <div className="flex justify-center mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer" onClick={clearAll}>Clear All</button>
                </div>
            )}
        </div>
    )
}

export default Todolist