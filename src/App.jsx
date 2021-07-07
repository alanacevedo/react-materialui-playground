import React from 'react'
import { Typography, CssBaseline, Button, Container, Grid } from '@material-ui/core'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import theme from './styles'
import TestChart from './components/TestChart'
import MyAppBar from './components/MyAppBar'

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
                        <Grid container item xs={8}>
                            <TestChart/>
                        </Grid>
                        <Grid container item xs={4}>
                            <TestChart/>
                        </Grid>

                    </Grid>
                    
                </Container>
                
            </main>
        </ThemeProvider>
        </>
    )}

export default App