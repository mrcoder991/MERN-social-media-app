import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    top: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.type === 'dark' ? 'rgba(42, 36, 35, 0.85)' : 'rgba(248, 224, 221, 0.85)',
    backdropFilter: 'blur(20px)',
    padding: '5px 20px',
    zIndex: "9",
    [theme.breakpoints.down('sm')]: {
      padding: '0.5em 1em'
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  textImage: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding:'0',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
    gap: '1em',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  userMenu: {
    width: '320px',
  },
  userMenuItem: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '100%',
  },
  privacyPolicy: {
    display: 'grid',
    placeItems: 'center',
    padding:'0.5em'
  }
}));