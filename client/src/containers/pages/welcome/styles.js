import { makeStyles } from '@material-ui/core/styles'
export const styles = ((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  menuItem: {
    margin: theme.spacing(1),
    width: '45%',
  },

}));
