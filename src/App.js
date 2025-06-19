import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>📇 Address Book</h1>
          <nav style={styles.navbar}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/add" style={styles.link}>Add Contact</Link>
          </nav>
        </header>

        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '700px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 'bold',
  },
  main: {
    paddingTop: '20px',
  },
};

export default App;