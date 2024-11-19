import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Write from './pages/Write';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Post from './pages/Post';
import Login from './pages/Login';
import SignUpEmail from './pages/SignUpEmail';
import SignUpEmailCert from './pages/SignUpEmailCert';
import SignUpSuccess from './pages/SignUpSuccess';
import SignUpSite from './pages/SignUpSite';
import SignUpSiteConfirm from './pages/SignUpSiteConfirm';

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound/>} />
          <Route path="/" element={<Main />} />
          <Route path='/write' element={<Write/>} />
          <Route path='/post' element={<Post/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signUpemail' element={<SignUpEmail/>} />
          <Route path='/signUpemailCert' element={<SignUpEmailCert/>} />
          <Route path='/signUpSuccess' element={<SignUpSuccess/>} />
          <Route path='/signUpSite' element={<SignUpSite/>} />
          <Route path='/signUpSiteConfirm' element={<SignUpSiteConfirm/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
