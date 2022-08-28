import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    // padding: theme.spacing(2),
    borderRadius: '12px',
    overflow: 'hidden',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
  },
  fileInput: {
    width: '95%',
    border: '1px solid',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    marginBottom:'10px'
    
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '95%',
    margin: '10px 0',

  },
  selectedFile: {
    width: '100%',
    aspectRatio: 1 / 1,
    objectFit: 'cover',
    transform: 'scale(1.05) translateY(4px)',
    cursor: 'pointer'
  },
}));