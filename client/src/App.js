import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Home } from './pages/home';
import { AddBook } from './pages/addBook';
import { SavedBooks } from './pages/savesBooks';
import Navbar from './components/NavBar/Navbar';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Book } from './components/Book';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Home user={false} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add-book' element={<AddBook update={false} />} />
          <Route path='/books/update/:id' element={<AddBook update={true} />} />
          <Route path='/user/:id' element={<Home user={true} />} />
          <Route path='/books/:id' element={<Book />} />
          <Route path='/saved-books' element={<SavedBooks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
