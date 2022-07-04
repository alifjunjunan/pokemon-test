import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/detail-pokemon/:name' element={<DetailPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}

export default App;
