import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/user/home'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
