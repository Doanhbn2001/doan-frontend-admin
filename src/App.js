import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import SignIn from './pages/signin/signIn';
import { useState } from 'react';

function App() {
  const [isAdmin, setAdmin] = useState(
    localStorage.getItem('adminId') || false
  );

  return (
    <div className="App">
      <BrowserRouter>
        {isAdmin ? (
          <Home setAdmin={setAdmin} />
        ) : (
          <SignIn setAdmin={setAdmin} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
