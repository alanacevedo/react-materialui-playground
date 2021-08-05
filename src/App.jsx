import React, { useState } from 'react'
import { CssBaseline, Container, Grid, Hidden, Drawer} from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import theme from './styles'
import MyAppBar from './components/MyAppBar'
import SideTabs from './components/SideTabs'
import MapView from './components/MapView'
import { GlobalContext } from './utils/GlobalContext'
import NodeCharts from './components/NodeCharts'


const useStyles = makeStyles((theme) => ({
    color: {
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        padding: theme.spacing(6, 4, 6),
        backgroundColor: theme.palette.background.paper,
    },
}))

const App = () => {
    const classes = useStyles() 
    const [nodeId, setNodeId] = useState(-1)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [visibleNodes, setVisibleNodes] = useState([1, 2])
    const [shouldRefreshVNodes, setShouldRefreshVNodes] = useState(false) // Esto es para coordinar el botón de refresco en sideTabs y el mapa

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const tabs = (<SideTabs handleDrawerToggle={handleDrawerToggle}/>);
    
    return (
        <>
        <GlobalContext.Provider 
            value={{ id: nodeId, setNodeId:setNodeId, visibleNodes: visibleNodes, setVisibleNodes: setVisibleNodes,
                shouldRefreshVNodes: shouldRefreshVNodes, setShouldRefreshVNodes: setShouldRefreshVNodes}}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <MyAppBar handleDrawerToggle={handleDrawerToggle}/>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}     
                >
                    
                    {tabs}

                </Drawer>
            </Hidden>

            <main>
                <Container className={classes.container} maxWidth='xl'>
                    <Grid container spacing={2}>
                        <Grid container  item xs={12} md={8} justifyContent='center' spacing={3}>
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