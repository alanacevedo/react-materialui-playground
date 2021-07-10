import React, { useState } from 'react'
import { Typography, CssBaseline, Button, Container, Grid} from '@material-ui/core'
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
}))

const App = () => {
    const classes = useStyles() 
    const [nodeId, setNodeId] = useState(-1)

    return (
        <>
        <GlobalContext.Provider value={{ id: nodeId, setNodeId:setNodeId }}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <MyAppBar/>
            <main>
                <Container className={classes.container} maxWidth='xl'>
                    <Grid container spacing={2}>
                        <Grid container item xs={11} md={8} justifyContent='center'>
                            <Grid item xs={11}>
                                <MapView/>
                            </Grid>
                            <NodeCharts/>
                        </Grid>
                        <Grid container item xs={11} md={4}>
                            <SideTabs/>
                        </Grid>
                    </Grid>
                </Container>
                
            </main>
        </ThemeProvider>
        </GlobalContext.Provider>
        </>
    )}

export default App