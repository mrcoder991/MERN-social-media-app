import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Pagination from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import jwt_decode from 'jwt-decode';

import { getPostsBySearch } from '../../actions/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([])
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')


    const googleSuccess = async (res) => {
        const actualRes = jwt_decode(res.credential);
        const result = actualRes;
        const token = res?.credential;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        if (!user) {
            /* global google */
            google.accounts.id.initialize({
                client_id: '74117768345-1ui9u3cp9db7vkegavpv4impvpc8tm2r.apps.googleusercontent.com',
                callback: googleSuccess
            });
            google.accounts.id.prompt();
        }
        // eslint-disable-next-line
    }, [])


    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };



    return (
        <Grow in>
            <Container className={classes.homeContainer} maxWidth='xl' style={{ margin: '100px 0 20px' }}>
                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit" elevation={2}>
                            <TextField
                                name='search'
                                varient='outlined'
                                label='Serch Notions'
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant='contained' disableElevation>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                    </Grid>
                </Grid>
                {(!searchQuery && !tags.length) && (
                    <Paper className={classes.pagination} elevation={2}>
                        <Pagination page={page} />
                    </Paper>
                )}
            </Container>
        </Grow>
    )
}

export default Home;