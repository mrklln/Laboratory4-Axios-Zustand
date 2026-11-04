import { useEffect, useState } from 'react'
import axios from 'axios'

// users page: shows user information loaded from the DummyJSON API
function Users() {
    const [users, setUsers] = useState([]) // the users loaded from the API
    const [loading, setLoading] = useState(true) // true while the data is still loading
    const [error, setError] = useState(null) // stores the error message if the request fails

    // get the users from the API using axios
    const getData = async () => {
        setLoading(true) // show the loading indicator again (used by the Try again button)
        setError(null) // clear the old error
        try {
            const response = await axios.get('https://dummyjson.com/users?limit=8')
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
        <div className="w-full max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-white mb-1">Users</h1>
            <p className="text-slate-300 italic text-center mb-4">
                User information loaded with Axios from dummyjson.com
            </p>

            {/* loading indicator while the data is being retrieved */}
            {loading && (
                <div className="flex flex-col items-center gap-3 py-10">
                    <div className="w-10 h-10 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin" />
                    <p className="text-slate-300">Loading users...</p>
                </div>
            )}

            {/* error message if the request failed */}
            {error && (
                <div className="max-w-md mx-auto bg-red-500/10 border border-red-400 rounded-xl p-4 text-center">
                    <p className="text-red-300 font-bold mb-1">Couldn't load the users</p>
                    <p className="text-red-200 text-sm mb-3">{error}</p>
                    <button onClick={getData} className="px-4 py-2 rounded-lg bg-red-500 text-white cursor-pointer">
                        Try again
                    </button>
                </div>
            )}

            {/* user cards: picture, full name, username, email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {users.map((u) => (
                    <div
                        key={u.id}
                        className="bg-white/10 rounded-2xl p-4 text-center transition duration-200 hover:bg-white/20 hover:-translate-y-1"
                    >
                        <img src={u.image} alt={`${u.firstName} ${u.lastName}`} className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3" />
                        <p className="text-white font-bold truncate">{u.firstName} {u.lastName}</p>
                        <p className="text-blue-300 text-sm truncate">@{u.username}</p>
                        <p className="text-slate-300 text-sm truncate">{u.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users