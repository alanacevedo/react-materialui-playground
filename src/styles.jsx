import { createTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple';
import { esES } from '@material-ui/core/locale'

const theme = createTheme({
    typography: {
        h2: {
            fontSize: 36,
        }
    },
    palette: {

        primary: {
            main: purple[700]
        },
        secondary: {
            main: purple[300]
        }
    },
    paper: {
        background: "white"
      }
}, esES)

export default theme