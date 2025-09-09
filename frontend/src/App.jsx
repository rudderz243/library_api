// calling in the required imports to handle routing between multiple pages
import { BrowserRouter as Routes, Router, Route } from 'react-router-dom'
// call in our pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'


function App() {
  return (
    /* the router is the main thing that handles our routing needs */
    <Router>
      {/* we then specify that we have MULTIPLE routes */}
      <Routes>
        {/* each route has a path (where it lives), and an element (what page it related to) */}
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
