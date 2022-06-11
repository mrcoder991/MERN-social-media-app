import * as React from 'react';
import { Box, Button, Typography, Modal, Divider, Link} from '@material-ui/core';
import GithubForLight from './icons/githubForLight';
import GithubForDark from './icons/githubForDark';

import useMediaQuery from '@material-ui/core/useMediaQuery';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minWidth: '30%',
    maxWidth: '90%',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 2,
    p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


    return (
        <div>
            <Button gutter onClick={handleOpen} disableElevation> {prefersDarkMode ? <GithubForDark/> : <GithubForLight/>} <strong> &nbsp; Contribute</strong></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Got any feature ideas?
                    </Typography>
                    <Divider/>
                    <Typography style={{margin:'10px 0'}} id="modal-modal-description" sx={{ mt: 2 }}>
                        Go ahed and create a issue or a pull request by making a fork of the repo, I really need help from the fellow developers
                        to enhance the project even more, at the end this is Our own social media site for our own MESCOE, I wanted to make this 
                        project open source for the reason that we all could contribute and make this app even more feature rich.
                        <br/>
                        <Link href="https://github.com/mrcoder991">- Uday Girhepunje </Link>  
                    </Typography>
                    <Button component='a' disableElevation variant='outlined' href='https://github.com/mrcoder991/MERN-social-media-app'>{prefersDarkMode ? <GithubForDark/> : <GithubForLight/>} &nbsp; Github Repo</Button>
                </Box>
            </Modal>
        </div>
    );
}
