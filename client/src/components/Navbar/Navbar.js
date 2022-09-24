import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography, Box, Tooltip, IconButton, Popover, Divider } from '@material-ui/core';
import Modal from '../Modal'
import { useDispatch } from 'react-redux';
// import decode from 'jwt-decode';
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

  //Function to logout user
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
    setUser(null);
  };


  useEffect(() => {
    
    // Logs out user if the jwt token expires
    // const token = user?.token;
    // if (token) {
    //   const decodedToken = decode(token);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }

    setUser(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const open = Boolean(anchorElUser);
  const id = open ? 'simple-popover' : undefined;


  return (
    <AppBar className={classes.appBar} position="static" color="inherit" elevation={2}>
      <Link to='/' className={classes.brandContainer}>
        <img src={nonLogo} alt='icon' height='40px' />
        <img className={classes.textImage} src={prefersDarkMode ? nonTextForDark : nonTextForLight} alt="icon" height="30px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        <Modal />
        {user ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton aria-describedby={id} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name?.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorElUser}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div className={classes.userMenu}>
                <div className={classes.userMenuItem}>
                  <Avatar style={{margin:'0.5em'}} className={classes.purple} alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name?.charAt(0)}</Avatar>
                  <Typography variant="subtitle1"><b>{user?.result?.name}</b></Typography>
                  <Typography variant='body2'>{user?.result?.email}</Typography>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.userMenuItem}>
                  <Button disableElevation onClick={logout} size="small" variant="outlined">Log out</Button>
                </div>
                <Divider className={classes.divider} />
                <div className={classes.privacyPolicy}>
                  <Typography variant="caption" component={Link} to='/privacypolicy'>Privacy Policy</Typography>
                </div>
              </div>
            </Popover>
          </Box>
        ) : (
          <Button disableElevation component={Link} to="/auth" variant="contained" color='primary'>Sign In</Button>
        )}

      </Toolbar>

    </AppBar>
  )
}

export default Navbar