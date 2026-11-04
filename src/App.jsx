import { Routes, Route, Navigate,  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Groups from './pages/Groups'
import GroupTask from './pages/GroupTask'
import Userguide from './pages/userguide'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Footer from './components/Footer' // with the other imports

function App() {
    {/* React Router handles navigation between the Home page and Groups page */}
    return (
        <div className="w-full min-h-screen p-3 sm:p-6 bg-linear-to-br from-slate-600 to-slate-950">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:groupId" element={<GroupTask />} />
                <Route path="users" element={<Users />} />
                <Route path="/userguide" element={<Userguide />} />
                <Route path="/about" element={<About />} />
            </Routes>   
        <Footer />
        </div>
    )
}

export default App