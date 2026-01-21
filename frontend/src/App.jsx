import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "../components/LoginPage.jsx";
import SignupPage from "../components/SignupPage.jsx";
import Dashboard from "../components/Dashboard.jsx";

function App() {
  return (
      <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/dashboard/:noteId" element={<Dashboard/>}/> 
            </Routes>
          </div>
      </Router>
  );
}

export default App
