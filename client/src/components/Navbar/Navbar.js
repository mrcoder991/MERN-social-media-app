import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import useStyles from './Styles'
import memories from '../../images/memories.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);

  useEffect(() => {
    const token = user?.token;

    //jwt

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser = null;
  }
  

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.Toolbar} >
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.username} variant="h6">{user.result.name}</Typography>
            <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
            <Button component={Link} to="/auth" variant="contained" color='primary'>Sign In</Button>
        )}
      </Toolbar>
      </AppBar>
  )
}

export default Navbar