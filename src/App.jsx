import React, { useState } from 'react'
import { CssBaseline, Container, Grid, Hidden, Drawer} from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import theme from './styles'
import MyAppBar from './components/MyAppBar'
import SideTabs from './components/SideTabs/SideTabs'
import MapView from './components/MapView'
import NodeCacheContext from './utils/context/NodeCacheContext'
import ActiveNodesContext from './utils/context/ActiveNodesContext'
import VisibleNodesContext from './utils/context/VisibleNodesContext'
import NodeCharts from './components/NodeCharts'
import TestingComponent from './components/TestingComponent'
import TemporalCharts from './components/TemporalCharts'


const useStyles = makeStyles((theme) => ({
    color: {
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        padding: theme.spacing(6, 4, 6),
        backgroundColor: theme.palette.background.paper,
        minHeight: '100vh'
    },
}))

const App = () => {
    const classes = useStyles() 
    const [activeNodes, setActiveNodes] = useState([])
    const [mobileOpen, setMobileOpen] = useState(false)
    const [visibleNodes, setVisibleNodes] = useState([])
    const [shouldRefreshVNodes, setShouldRefreshVNodes] = useState(false) // Esto es para coordinar el botón de refresco en sideTabs y el mapa
    const [nodeCache, setNodeCache] = useState({})

    const activeNodesContextValue = { activeNodes: activeNodes, setActiveNodes: setActiveNodes,}

    const nodeCacheContextValue = { 
         nodeCache: nodeCache, setNodeCache: setNodeCache}

    const vNodesContextValue = {visibleNodes: visibleNodes, setVisibleNodes: setVisibleNodes,
        shouldRefreshVNodes: shouldRefreshVNodes, setShouldRefreshVNodes: setShouldRefreshVNodes,}

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }


    const tabs = (<SideTabs handleDrawerToggle={handleDrawerToggle}/>);
    
    return (
        <>
        <TestingComponent/>
        <ActiveNodesContext.Provider value={activeNodesContextValue}>
        <VisibleNodesContext.Provider value={vNodesContextValue}>
        <NodeCacheContext.Provider value={nodeCacheContextValue}>


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
                        <Grid container  item xs={12} md={8}  spacing={3} alignContent='flex-start'>
                            <Grid item xs={11}>
                                <MapView/>
                            </Grid>
                            <Grid item xs={12}>
                               <NodeCharts/>       
                            </Grid>
                            <Grid item xs={12}>
                               <TemporalCharts/>       
                            </Grid>
                            
                            
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

        </NodeCacheContext.Provider>
        </VisibleNodesContext.Provider>
        </ActiveNodesContext.Provider>
        
        </>
    )}

export default App