import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const MyAppBar = () => {
    const classes = useStyles();

    return(
        <>
        <AppBar position='relative'>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                
            </AppBar>
        </>
    )
}

export default MyAppBar