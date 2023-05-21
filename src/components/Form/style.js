import { makeStyles } from '@material-ui/core/styles';
import formBg from '../../images/slanted-gradient.svg'

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    backgroundColor: "#BE4CFF",
  backgroundImage: {formBg},
  backgroundAttachment: 'fixed',
backgroundSize: 'cover',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));