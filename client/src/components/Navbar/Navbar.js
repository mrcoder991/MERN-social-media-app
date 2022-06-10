import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography,MenuItem, Box, Tooltip,Menu,IconButton  } from '@material-ui/core';
import Modal from '../Modal'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './Styles'
import nonTextForLight from '../../images/nonTextForLight.png';
import nonTextForDark from '../../images/nonTextForDark.png';
import nonLogo from '../../images/nonLogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';
import useMediaQuery from '@material-ui/core/useMediaQuery';




const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


  // console.log(user);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

 
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    // const handleOpenNavMenu = (event) => {
    //   setAnchorElNav(event.currentTarget);
    // };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    // const handleCloseNavMenu = () => {
    //   setAnchorElNav(null);
    // };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to='/' className={classes.brandContainer}>
        <img src={nonLogo} alt='icon' height='40px'/>
        <img className={classes.textImage} src={prefersDarkMode ? nonTextForDark : nonTextForLight} alt="icon" height="30px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        <Modal/>
        {user ? (
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name?.charAt(0)}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
            <Typography >{user?.result?.name}</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={logout} textalign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
        ) : (
            <Button  disableElevation component={Link} to="/auth" variant="contained" color='primary'>Sign In</Button>
        )}
        
      </Toolbar>

      </AppBar>
  )
}

export default Navbar