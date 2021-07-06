import React from 'react'
import { Typography, CssBaseline, Button } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
 import theme from './styles'

const App = () => {
    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Typography variant='h2'>XD</Typography>
            <Button variant='contained' color='primary'>
                Primary action
            </Button>
            <Button variant='outlined' color='secondary'>
                Secondary action
            </Button>
        </ThemeProvider>
        </>
    )}

export default App