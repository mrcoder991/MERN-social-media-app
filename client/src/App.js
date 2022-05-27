import React from 'react';
import { Container } from '@material-ui/core';
import { Routes, Route, BrowserRouter, Navigate} from "react-router-dom"

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="xl">
        <Routes>
          <Route exact path="/" element={<Navigate replace={true} to='/posts' />} />
          <Route exact path="/posts" element={<Home />} />
          <Route exact path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/auth" element={(!user ? <Auth /> : <Navigate to='/posts'/>)} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
