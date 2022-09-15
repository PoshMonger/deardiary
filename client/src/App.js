
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './routes/Home';
import About from './components/About';
import Login from './routes/Login'
import EntryDetailsPage from './routes/EntryDetailsPage';
import UpdatePage from './routes/UpdatePage';
import { EntriesContextProvider } from './context/EntriesContext'
import { ThemeContextProvider } from './context/ThemeContext';
import { UserContextProvider } from './context/UserContext';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
    
    <ThemeContextProvider>
    <EntriesContextProvider>
    <UserContextProvider>
        <Router>
        <NavBar/>
          <Routes>
            
            <Route path="/" element={<Home/>} />
            <Route path="/albums/:id/update" element={<UpdatePage/>} />
            <Route path="/albums/:id" element={<EntryDetailsPage/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
        </UserContextProvider>
    </EntriesContextProvider>
    </ThemeContextProvider>
  
    </>
  );
}

export default App;
