import { Grid, Typography } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from '@material-ui/pickers'

const DatePickerComponent = (props) => {

    const { selectedMaxDate, handleMaxDateChange, selectedMinDate, handleMinDateChange } = props

    return(
        <>

        
        <Grid container item alignItems='center' xs={8}> 
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>


                <Grid container item alignItems='center' spacing={4} xs>

                    <Grid container item xs={6} spacing={2} alignItems='center' justifyContent='flex-end'>
                        <Grid item>
                            <Typography>Desde: </Typography>
                        </Grid>
                        <Grid item > {/* existe minDate y maxDate  https://material-ui-pickers.dev/api/DatePicker*/}
                            <DatePicker value={selectedMinDate} onChange={handleMinDateChange} disableFuture={true} inputVariant='outlined' />
                        </Grid>
                    </Grid>


                    <Grid container item xs={6} spacing={2} alignItems='center' justifyContent='flex-start'>
                        <Grid item>
                            <Typography>Hasta: </Typography>
                        </Grid>
                        <Grid item >
                            <DatePicker value={selectedMaxDate} onChange={handleMaxDateChange} disableFuture={true} inputVariant='outlined'/>
                        </Grid>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>    
        </Grid>           
        </>
    )
}


export default DatePickerComponent