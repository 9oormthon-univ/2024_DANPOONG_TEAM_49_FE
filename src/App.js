import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Write from './pages/Write';
import NotFound from './pages/NotFound';
import Success from './pages/Success';
import Search from './pages/Search';
import Home from './pages/Home';
import Comment from './pages/Comment';
import Splash from './pages/Splash';
import Post from './pages/Post';
import Login from './pages/Login';
import SignUpEmail from './pages/SignUpEmail';
import SignUpEmailCert from './pages/SignUpEmailCert';
import SignUpSuccess from './pages/SIgnUpSuccess';
import SignUpSite from './pages/SignUpSite';
import SignUpSiteConfirm from './pages/SignUpSiteConfirm';
import MypageJoined from './pages/MypageJoined';
import MypageHosted from './pages/MypageHosted';

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path='/' element={<Home />} />
          <Route path='/success' element={<Success/>} />
          <Route path='/search' element={<Search/>} />
          <Route path="/comment/:id" element={<Comment />} />
          <Route path='*' element={<NotFound/>} />
          <Route path='/' element={<Splash/>} />
          <Route path='/write' element={<Write/>} />
          <Route path='/post/:id' element={<Post/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup/email' element={<SignUpEmail/>} />
          <Route path='/signup/email-cert' element={<SignUpEmailCert/>} />
          <Route path='/signup/success' element={<SignUpSuccess/>} />
          <Route path='/signup/site' element={<SignUpSite/>} />
          <Route path='/signup/site-confirm' element={<SignUpSiteConfirm/>} />
          <Route path='/mypage/joined' element={<MypageJoined/>} />
          <Route path='/mypage/hosted' element={<MypageHosted/>} />
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;