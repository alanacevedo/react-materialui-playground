/* eslint-disable eqeqeq */
import React, { useContext, useState } from 'react';
import { PlotlyChart } from './PlotlyCharts'
import { Grid } from '@material-ui/core'
import { GlobalContext } from '../utils/GlobalContext'
import { getNodeData } from '../utils/database';
import { subMonths } from 'date-fns'
import ToggleHideButton from './ToggleHideButton';


import DatePickerComponent from './DatePickerComponent'

const NodeCharts = () => {
    const { id } = useContext(GlobalContext)
    const [selectedMaxDate, handleMaxDateChange]  = useState(new Date())
    const [selectedMinDate, handleMinDateChange] = useState(subMonths(selectedMaxDate, 1))
    const [shouldHideCharts, setShouldHideCharts] = useState(false)
    

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

    const mainComponent = 
    <>
        <DatePickerComponent 
            selectedMinDate={selectedMinDate} handleMinDateChange={handleMinDateChange} 
            selectedMaxDate={selectedMaxDate} handleMaxDateChange={handleMaxDateChange}
        />
        
        <Grid item xs={12}>
            <PlotlyChart chartData={tempData}/>
        </Grid>
        <Grid item xs={12}>
            <PlotlyChart chartData={pressureData}/>
        </Grid>
        <Grid item xs={12}>
            <PlotlyChart chartData={ecData}/>
        </Grid>
    </>  

    return (
        <>
        <Grid container item xs md={3} alignItems='center'>
            <ToggleHideButton componentString='Datos y alertas' shouldHide={shouldHideCharts} setShouldHide={setShouldHideCharts}/>
        </Grid>
        {
        /* Esta linea hace que varíe lo que se muestra según el valor de shouldHide */
        shouldHideCharts ? <></> : mainComponent
        }
        </>   
    )
}

export default NodeCharts