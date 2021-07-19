import React, { useState } from 'react'
import { Typography, CssBaseline, Button, Container, Grid, Hidden, Drawer} from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import theme from './styles'
import MyAppBar from './components/MyAppBar'
import SideTabs from './components/SideTabs'
import MapView from './components/MapView'
import { GlobalContext } from './utils/GlobalContext'
import NodeCharts from './components/NodeCharts'


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6, 4, 6),
    },
    paper: {
        background: "white"
      }
}))

const App = () => {
    const classes = useStyles() 
    const [nodeId, setNodeId] = useState(-1)
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const tabs = (<SideTabs/>);
    
    return (
        <>
        <GlobalContext.Provider value={{ id: nodeId, setNodeId:setNodeId }}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <MyAppBar handleDrawerToggle={handleDrawerToggle}/>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{ paper: classes.paper }}     
                >
                    {tabs}

                </Drawer>
            </Hidden>

            <main>
                <Container className={classes.container} maxWidth='xl'>
                    <Grid container spacing={2}>
                        <Grid container item xs={11} md={8} justifyContent='center'>
                            <Grid item xs={11}>
                                <MapView/>
                            </Grid>
                            <NodeCharts/>
                        </Grid>
                        <Hidden smDown>
                            <Grid container item xs={11} md={4}>
                                {tabs}
                            </Grid>
                        </Hidden>
                        
                    </Grid>
                </Container>
                
            </main>
        </ThemeProvider>
        </GlobalContext.Provider>
        </>
    )}

export default App