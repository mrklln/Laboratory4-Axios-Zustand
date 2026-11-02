import { Routes, Route, Navigate,  } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Groups from './pages/Groups'
import GroupTask from './pages/GroupTask'
import Userguide from './pages/userguide'
import About from './pages/About'

function App() {
    {/* React Router handles navigation between the Home page and Groups page */}
    return (
        <div className="min-h-screen p-3 sm:p-6 bg-linear-to-br from-slate-600 to-slate-950">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:groupId" element={<GroupTask />} />
                <Route path="/userguide" element={<Userguide />} />
                <Route path="/about" element={<About />} />
            </Routes>   
        </div>
    )
}

export default App