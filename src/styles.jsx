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

/* Esto es por mientras y no funciona bien, hay que decidir cómo se eligen los colores, 
       quizás usar una función tipo hash con la id? */
export function getNodeColor(n) {
    switch (n) {
        case 0: return theme.palette.primary.main;
        case 1: return 'rgb(11, 214, 0)'; 
        case 2: return 'rgb(51, 175, 255)'
        default: return 'rgb(0, 0, 0)'
    }
}

export default theme