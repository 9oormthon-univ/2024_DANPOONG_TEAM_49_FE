import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Write from './pages/Write';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Post from './pages/Post';
import Success from './pages/Success';
import Search from './pages/Search';

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path='/' element={<Main />} />
          <Route path='/write' element={<Write/>} />
          <Route path='post/:id' element={<Post />} />
          <Route path='/success' element={<Success/>} />
          <Route path='/search' element={<Search/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
