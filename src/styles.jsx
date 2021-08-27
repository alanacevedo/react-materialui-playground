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

export function getNodeColor(n) {
    switch (n%12) {
        case 0: return 'rgb(106,61,154)';
        case 1: return 'rgb(51,160,44)'; 
        case 2: return 'rgb(31,120,180)';
        case 3: return 'rgb(177,89,40)';
        case 4: return 'rgb(255,255,153)';
        case 5: return 'rgb(202,178,214)';
        case 6: return 'rgb(255,127,0)';
        case 7: return 'rgb(253,191,111)';
        case 8: return 'rgb(227,26,28)';
        case 9: return 'rgb(251,154,153)';
        case 10: return 'rgb(178,223,138)';
        case 11: return 'rgb(166,206,227)';
        default: return 'rgb(0, 0, 0)'
    }
}

export default theme