import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Write from './pages/Write';
import NotFound from './pages/NotFound';
import Post from './pages/Post';
import Success from './pages/Success';
import Search from './pages/Search';
import Home from './pages/Home';
import Comment from './pages/Comment';

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path='/' element={<Home />} />
          <Route path='/write' element={<Write/>} />
          <Route path='post/:id' element={<Post />} />
          <Route path='/success' element={<Success/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/comment' element={<Comment/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
