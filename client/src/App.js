import React from 'react';
import { Container } from '@material-ui/core';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#00b294',
          },
          secondary: {
            main: '#f44336',
          },
          contrastThreshold: 3,
          tonalOffset: 0.1,

        },
      }),
    [prefersDarkMode],
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
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
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
