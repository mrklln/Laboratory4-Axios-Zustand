
function About() {

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <h1 className="flex items-center gap-2 text-2xl font-bold mb-3">
                <span>📘</span>About
            </h1>
            <p className="text-gray-600 mb-3">
                This is a simple to-do list app where you can add tasks, mark them as done,
                undo them, delete them, or clear everything at once.
            </p>
            <p className="text-gray-600 mb-3">
                Built with React, Tailwind CSS, React Router, Zustand, and Axios for Laboratory 4.
            </p>
            <h2 className="font-bold text-lg mb-2">Group Members</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <li className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800">👤 Nhicos Gonzales</li>
                <li className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800">👤 Mark Allen C. Salomon</li>
                <li className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800">👤 Rem Ivan Recelis</li>
                <li className="bg-gray-100 rounded-lg px-3 py-2 text-gray-800">👤 Jimrie Parado</li>
            </ul>

            
        </div>
    )
}

export default About