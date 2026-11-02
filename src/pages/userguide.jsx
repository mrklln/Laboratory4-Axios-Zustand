 import { Link } from "react-router-dom"   
function Userguide() {
    const steps = [
        { to: "/", text: <>✏️ Type your task and click <b>Add</b> (or press Enter).</> },
        { to: "/", text: <>📖 New tasks appear in the <b>Not Done</b> box.</> },
        { to: "/", text: <>✅ Click <b>Done</b> to move a task to the <b>Done</b> box.</> },
        { to: "/", text: <>↩️ Click <b>Undo</b> to move it back to Not Done.</> },
        { to: "/", text: <>🗑️ Click <b>Delete</b> to remove a task.</> },
        { to: "/", text: <>🔄 Click <b>Clear All</b> to reset everything.</> },
        { to: "/groups", text: <>👥 Click <b>Groups</b> type the name of the group and click <b>Add Group</b> to create a Group</> },
        { to: "/groups", text: <>➕ To add task on a group, Click <b>Open</b> to a existing group then type the task and click <b>Add Task</b></> },
        { to: "/", text: <>🔗 To navigate between pages, click the pages on <b>Navigation bar</b></> },
    ];

    return (
        <div className="bg-zinc-600 w-full max-w-lg mx-auto rounded-xl shadow p-4 sm:p-6">
            <h2 className="sm:text-2xl text-xl font-bold mb-4 text-center text-white">
                <span className="mr-2">📘</span>User Guide
            </h2>
            <ol className="grid grid-cols-1 gap-3 sm:gap-4">
                {steps.map((step, i) => (
                    <li key={i}>
                        <Link
                            to={step.to}
                            className="bg-zinc-700 hover:bg-zinc-500 transition rounded-lg shadow p-4 text-white flex gap-3 items-start"
                        >
                            <span className="font-bold">{i + 1}.</span>
                            <span>{step.text}</span>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}

    export default Userguide