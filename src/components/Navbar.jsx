import { NavLink } from 'react-router-dom'

function Navbar() {
    const linkClass = ({ isActive }) => // style for the links: blue if on the current page, gray if not
        `px-4 py-2 rounded-lg font-medium transition ${
            isActive ? 'bg-blue-500 text-white' : 'text-slate-200 hover:bg-white/10'
        }`

    return (
        <nav className="w-full max-w-6xl mx-auto mb-4 rounded-xl shadow-lg px-4 py-3 flex items-center justify-between">
            <span className="text-white font-bold text-2xl">To-Do App</span>
            <div className="flex gap-2">
                <NavLink to="/" end className={linkClass}>Home</NavLink>
                <NavLink to="/groups" className={linkClass}>Groups</NavLink>
                <NavLink to="/userguide" className={linkClass}>User Guide</NavLink>
                <NavLink to="/about" className={linkClass}>About</NavLink>
            </div>
        </nav>
    )
}

export default Navbar