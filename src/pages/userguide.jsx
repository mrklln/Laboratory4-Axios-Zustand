import { Link } from "react-router-dom"

// user guide page: step by step instructions, each step links to the related page
function Userguide() {
    const steps = [
        // tasks
        { to: "/home", text: <>✏️ Type your task and click <b>Add Task</b> (or press Enter).</> },
        { to: "/home", text: <>📖 New tasks appear in the <b>Not Done</b> box.</> },
        { to: "/home", text: <>✅ Click <b>Done</b> to mark a task as done. It moves to the <b>Done</b> box.</> },
        { to: "/home", text: <>↩️ Click <b>Undo</b> to mark it as Not Done again.</> },
        { to: "/home", text: <>🗑️ Click <b>Delete</b> to remove a task, or <b>Clear All</b> to remove everything.</> },

        // groups
        { to: "/groups", text: <>👥 To create a group, go to <b>Groups</b>, type the group name, and click <b>Add Group</b>.</> },
        { to: "/groups", text: <>➕ To add a task to a group, click <b>Open</b> on that group, type the task, and click <b>Add Task</b>.</> },
        { to: "/home", text: <>📌 For a task without a group, click <b>Assign</b>, then choose a group from the list.</> },

        // navigation
        { to: "/groups", text: <>🔗 Use the <b>Navigation bar</b> to switch pages. On the Groups page, click <b>Open</b> to go to a group and <b>Back to groups</b> to return.</> },

        // axios and zustand
        { to: "/users", text: <>🌐 The <b>Users</b> page uses <b>Axios</b> to send a request to the DummyJSON API. It shows each user's picture, name, username, and email, with a loading message and an error message if the request fails.</> },
        { to: "/dashboard", text: <>🗃️ <b>Zustand</b> keeps the groups and tasks in one store. Every page reads from it, so a change on one page shows on all the others.</> },
    ];

    return (
        <div className="bg-zinc-600 w-full max-w-4xl mx-auto rounded-xl shadow p-3 sm:p-6">
            <h2 className="sm:text-2xl text-xl font-bold mb-4 text-center text-white">
                <span className="mr-2">📘</span>User Guide
            </h2>

            {/* two independent columns: each box only takes the height of its own text */}
            <ol className="columns-1 md:columns-2 gap-3">
                {steps.map((step, i) => (
                    <li key={i} className="break-inside-avoid mb-3">
                        <Link
                            to={step.to}
                            className="bg-zinc-700 hover:bg-zinc-500 transition rounded-lg shadow p-3 text-white text-sm flex gap-3 items-start"
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