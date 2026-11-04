import { useEffect, useState } from 'react'
import axios from 'axios'

// about page: description of the app, group members, and developers loaded from the API
function About() {
    const [users, setUsers] = useState([]) // the developers loaded from the API
    const [loading, setLoading] = useState(true) // true while the data is still loading
    const [error, setError] = useState(null) // stores the error message if the request fails

    // list of group members
    const members = [
        'Nhicos Gonzales',
        'Mark Allen C. Salomon',
        'Rem Ivan Recelis',
        'Jimrie Parado',
    ]

    // get the users from the API using axios
    const getData = async () => {
        setLoading(true) // show the loading indicator again (used by the Try again button)
        setError(null) // clear the old error
        try {
            const response = await axios.get('https://dummyjson.com/users?limit=6')
            setUsers(response.data.users)
        } catch (err) {
            setError(err.message) // save the error message to show it on the page
        } finally {
            setLoading(false) // stop loading whether it worked or failed
        }
    }

    // runs once when the page loads
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <h1 className="flex items-center gap-2 text-2xl font-bold mb-3">
                <span>📘</span>About
            </h1>
            <p className="text-gray-600 mb-3">
                This is a simple to-do list app where you can add tasks, mark them as done,
                undo them, delete them, or clear everything at once.
            </p>
            <p className="text-gray-600 mb-4">
                Built with React, Tailwind CSS, React Router, Zustand, and Axios for Laboratory 4.
            </p>

            {/* group members with hover effect */}
            <h2 className="font-bold text-lg mb-2">Developers</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {members.map((m) => (
                    <li
                        key={m}
                        className="group flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2 text-gray-800 cursor-pointer
                                   transition duration-200
                                   hover:bg-blue-500 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                    >
                        <span className="transition duration-200 group-hover:scale-125">👤</span>
                        <span className="font-medium">{m}</span>
                    </li>
                ))}
            </ul>

            {/* developers section: user information from the DummyJSON API */}
            <h2 className="font-bold text-lg mb-1">Developers</h2>
            <p className="text-gray-500 italic text-sm mb-3">User information loaded with Axios from dummyjson.com</p>

            {/* loading indicator while the data is being retrieved */}
            {loading && (
                <div className="flex flex-col items-center gap-2 py-6">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                    <p className="text-gray-500">Loading users...</p>
                </div>
            )}

            {/* error message if the request failed */}
            {error && (
                <div className="bg-red-50 border border-red-300 rounded-xl p-4 text-center">
                    <p className="text-red-600 font-bold mb-1">Couldn't load the users</p>
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                    <button onClick={getData} className="px-4 py-2 rounded-lg bg-red-500 text-white cursor-pointer">
                        Try again
                    </button>
                </div>
            )}

            {/* developer cards: picture, full name, username, email */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {users.map((u) => (
                    <li
                        key={u.id}
                        className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2 transition duration-200 hover:bg-gray-200 hover:-translate-y-1 hover:shadow"
                    >
                        <img src={u.image} alt="" className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                        <div className="min-w-0">
                            <p className="font-bold text-gray-800 truncate">{u.firstName} {u.lastName}</p>
                            <p className="text-sm text-blue-600 truncate">@{u.username}</p>
                            <p className="text-sm text-gray-600 truncate">{u.email}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default About