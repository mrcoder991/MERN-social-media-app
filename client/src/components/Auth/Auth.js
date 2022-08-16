import React,{useState} from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, FormControlLabel, Checkbox } from "@material-ui/core";
import {GoogleLogin} from 'react-google-login'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./Styles";
import Input from "./Input";
import Icon from "./Icon";
import {signin, signup} from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate)) 
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleCheck = (event) => {
        setChecked(!checked);
      };
    
    const switchMode = () => setIsSignUp((isSignUp) => !isSignUp);;
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const googleSuccess = async (res) => {
        const result = res?.profile;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };

    const googleFailure = (error) => {
        console.log('Google sign in was unsuccessfull. Try Again later');
        console.log(error)
    };
    
    return (
        <Container component="main" maxWidth="xs" style={{marginTop:'100px'}}>
            <Paper className={classes.paper} elevation={2}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography varient="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name='email'
                            label='Email Address'
                            handleChange={handleChange}
                            type='email'
                        />
                        <Input
                            name='password'
                            label='Password'
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp &&
                            <Input
                            name='confirmPassword'
                            label='Repeat Password'
                            handleChange={handleChange}
                            type='password'
                            />
                        }
                    </Grid>
                    {isSignUp && <Grid>
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={checked}
                                onChange={handleCheck}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label={<Typography>I have read and agree to  <Link to='/privacypolicy'>Privacy Policy</Link></Typography>}
                        />
                    </Grid>}
                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit} disabled={!checked && isSignUp} disableElevation>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="74117768345-1ui9u3cp9db7vkegavpv4impvpc8tm2r.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                // color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                // disabled={renderProps.disabled}
                                disabled={true}
                                startIcon={<Icon />}
                                variant='contained'
                                disableElevation
                            >Sign In With Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button disableElevation onClick={switchMode}>
                            {isSignUp ? 'Already have an Account? Sign In' : "Don't have an Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
