/* eslint-disable eqeqeq */
import React, { useContext, useState } from 'react';
import { PlotlyChart } from './PlotlyCharts'
import { Grid, Typography } from '@material-ui/core'
import { GlobalContext } from '../utils/GlobalContext'
import { getNodeData } from '../utils/database';

import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale'
import { subMonths } from 'date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from '@material-ui/pickers'

const NodeCharts = () => {
    const { id } = useContext(GlobalContext)
    const [selectedMinDate, handleMinDateChange] = useState(new Date())
    const [selectedMaxDate, handleMaxDateChange] = useState(subMonths(selectedMinDate, 1))
    

    if (id === -1) {
        return (<></>)
    }

    const nodeData = getNodeData(id)

    const dataArray = nodeData['data']

    

    const dateArray = dataArray.map((a) => a[0])
    const tempArray = dataArray.map((a) => a[3])
    const tempAlertArray = dataArray.map((a) => a[4]==0 ? null:a[3])
    const pressureArray = dataArray.map((a) => a[1])
    const pressureAlertArray =  dataArray.map((a) => a[2]==0 ? null:a[1])
    const ecArray = dataArray.map((a) => a[5])
    const ecAlertArray =  dataArray.map((a) => a[6]==0 ? null:a[5])

    const tempData = {
        dateArray: dateArray,
        dataArray: tempArray,
        alertArray: tempAlertArray,
        dataTag: 'Temperatura (°C)',
    }

    const pressureData = {
        dateArray: dateArray,
        dataArray: pressureArray,
        alertArray: pressureAlertArray,
        dataTag: 'Presión [cm H2O]',
    }

    const ecData = {
        dateArray: dateArray,
        dataArray: ecArray,
        alertArray: ecAlertArray,
        dataTag: 'EC [µs/cm]',
    }

    return (
        <>

        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>

            <Grid container item direction='column' alignItems='center' xs={6} spacing={3}> {/* el xs y spacing está mal, debo ver una forma de centrarlo verticalmente sin eso */}

                <Grid container item alignItems='center' spacing={1} xs>

                    <Grid item>
                        <Typography>Desde: </Typography>
                    </Grid>
                    <Grid item >
                        <DatePicker value={selectedMinDate} onChange={handleMinDateChange}/>
                    </Grid>

                    <Grid item>
                        <Typography>Hasta: </Typography>
                    </Grid>
                    <Grid item >
                        <DatePicker value={selectedMaxDate} onChange={handleMaxDateChange}/>
                    </Grid>

                </Grid>
            </Grid>           

            <Grid item xs={11}>
                <PlotlyChart chartData={tempData}/>
            </Grid>
            <Grid item xs={11}>
                <PlotlyChart chartData={pressureData}/>
            </Grid>
            <Grid item xs={11}>
                <PlotlyChart chartData={ecData}/>
            </Grid>

        </MuiPickersUtilsProvider>
        
        </>  
    )
}

export default NodeCharts