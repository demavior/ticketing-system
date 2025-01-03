import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App