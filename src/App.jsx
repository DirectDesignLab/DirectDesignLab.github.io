import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import TypeThonHome from './pages/TypeThon/TypeThonHome';
import TypeThonTopic from './pages/TypeThon/TypeThonTopic';
import ProjectsHome from './pages/Projects/ProjectsHome';
import ProjectsTopic from './pages/Projects/ProjectsTopic';
import Archive from './pages/Archive';
import Footer from './components/Footer/Footer';
import './styles/global.css';
import './styles/variables.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/type-thon" element={<TypeThonHome />} />
        <Route path="/type-thon/:id" element={<TypeThonTopic />} />
        <Route path="/projects" element={<ProjectsHome />} />
        <Route path="/projects/:id" element={<ProjectsTopic />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;