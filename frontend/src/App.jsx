// calling in the required imports to handle routing between multiple pages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// call in our pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


function App() {
  return (
    /* the router is the main thing that handles our routing needs */
    <Router>
      {/* we then specify that we have MULTIPLE routes */}
      <Routes>
        {/* each route has a path (where it lives), and an element (what page it related to) */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* because dashboard is now wrapped in ProtectedRoute, authentication will be checked in order
        to navigate there */ }
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
