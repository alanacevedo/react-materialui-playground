/* eslint-disable eqeqeq */
import React, { useContext } from 'react';
import { PlotlyChart } from './PlotlyCharts'
import { Grid, Button } from '@material-ui/core'
import { GlobalContext } from '../utils/GlobalContext'
import { getNodeData } from '../utils/database';

const NodeCharts = () => {
    const { id } = useContext(GlobalContext)
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
        
            <Grid item xs={11}>
                <PlotlyChart chartData={tempData}/>
            </Grid>
            <Grid item xs={11}>
                <PlotlyChart chartData={pressureData}/>
            </Grid>
            <Grid item xs={11}>
                <PlotlyChart chartData={ecData}/>
            </Grid>
        </>  
    )
}

export default NodeCharts