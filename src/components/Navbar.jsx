import { NavLink } from 'react-router-dom' // link for navigating between pages

function Navbar() {
    // style for the links: blue if on the current page, gray if not
    const linkClass = ({ isActive }) =>
        `px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base whitespace-nowrap transition ${
            isActive ? 'bg-blue-500 text-white' : 'text-slate-200 hover:bg-white/10'
        }`

    return (
        // column on phones (title on top, links below), row on larger screens
        <nav className="w-full max-w-6xl mx-auto mb-4 rounded-xl shadow-lg px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            {/* app title */}
            <span className="text-white font-bold text-2xl">To-Do App</span>

            {/* page links: wrap to the next line when there is not enough space */}
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                <NavLink to="/home" end className={linkClass}>To-Do List</NavLink>
                <NavLink to="/groups" className={linkClass}>Groups</NavLink>
                <NavLink to="/users" className={linkClass}>Users</NavLink>
                <NavLink to="/userguide" className={linkClass}>User Guide</NavLink>
                <NavLink to="/about" className={linkClass}>About</NavLink>
            </div>
        </nav>
    )
}

export default Navbar