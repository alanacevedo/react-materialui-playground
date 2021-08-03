import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, Typography, Button, Hidden, Drawer } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const MyAppBar = (props) => {
    const classes = useStyles();

    return(
        <>
        <AppBar position='relative'>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    
                    <Typography variant="h6" className={classes.title}>
                        Fondef visualization demo
                    </Typography>
                    
                </Toolbar>
                
            </AppBar>

        </>
    )
}

export default MyAppBar