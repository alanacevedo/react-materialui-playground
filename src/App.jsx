import React from 'react'
import { Typography, CssBaseline, Button, Container, Grid } from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import theme from './styles'
import TestChart from './components/TestChart'
import MyAppBar from './components/MyAppBar'
import SideTabs from './components/SideTabs'
import MapView from './components/MapView'
import TestZoomChart from './components/TestZoomChart'
import TestDataPlotlyChart from './components/TestDataPlotlyChart'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(6, 4, 6)
    },
}))


const App = () => {
    const classes = useStyles() 

    return (
        <>
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
                            <Grid item xs={11}>
                                <TestChart/>
                            </Grid>
                            <Grid item xs={11}>
                                <TestZoomChart/>
                            </Grid>
                            <Grid item xs={11}>
                                <TestDataPlotlyChart/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={11} md={4}>
                            <SideTabs/>
                        </Grid>

                    </Grid>
                    
                </Container>
                
            </main>
        </ThemeProvider>
        </>
    )}

export default App