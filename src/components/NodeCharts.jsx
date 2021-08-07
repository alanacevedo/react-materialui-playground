/* eslint-disable eqeqeq */
import React, { useContext, useState } from 'react';
import { PlotlyChart } from './PlotlyCharts'
import { Grid } from '@material-ui/core'
import { GlobalContext } from '../utils/GlobalContext'
import { getNodeData, getNode } from '../utils/database';
import { subMonths } from 'date-fns'
import ToggleHideButton from './ToggleHideButton';
import { getLineColor } from '../styles'


import DatePickerComponent from './DatePickerComponent'
import ActiveNodeChips from './ActiveNodeChips';


const NodeCharts = () => {
    const { activeNodes } = useContext(GlobalContext)
    const [selectedMaxDate, handleMaxDateChange]  = useState(new Date())
    const [selectedMinDate, handleMinDateChange] = useState(subMonths(selectedMaxDate, 1))
    const [shouldHideCharts, setShouldHideCharts] = useState(false)
    

    if (activeNodes.length === 0) {
        return (<></>)
    }

    /*
    Estos arrays se irán llenando con las series que se mostrarán en el respectivo gráfico, por cada nodo se agrega
    la linea correspondiente a la serie de tiempo, y además los puntos de scatter correspondientes a las alertas
    */ 

    const tempTraces = []
    const pressureTraces = [];
    const ecTraces = [];


    
    

    // Esto es poco eficiente, ver cómo hacer uso de caché para no repetir tantas consultas, quizás con useState, useEffect?
    activeNodes.forEach((nodeId, index) => {
        const nodeData = getNodeData(nodeId)
        const estacionName = getNode(nodeId).estacion
        const dataArray = nodeData['data']
        const colorId = index

        const dateArray = dataArray.map((a) => a[0])
        const tempArray = dataArray.map((a) => a[3])
        const tempAlertArray = dataArray.map((a) => a[4]==0 ? null:a[3])
        const pressureArray = dataArray.map((a) => a[1])
        const pressureAlertArray =  dataArray.map((a) => a[2]==0 ? null:a[1])
        const ecArray = dataArray.map((a) => a[5])
        const ecAlertArray =  dataArray.map((a) => a[6]==0 ? null:a[5])

        const tempScatterTrace = {
            x: dateArray,
            y: tempAlertArray, 
            mode: 'markers',
            name: 'Alerta ' + estacionName,
            marker: {
              color: 'rgb(219, 64, 82)',
              size: 9
            },
          };
          
        const tempLineTrace = {
            x: dateArray,
            y:  tempArray,
            mode: 'lines',
            name: estacionName,
            line: {
                color: getLineColor(colorId),
                width: 3
            }
        };

        tempTraces.push(tempScatterTrace, tempLineTrace)

        const pressureScatterTrace = {
            x: dateArray,
            y: pressureAlertArray, 
            mode: 'markers',
            name: 'Alerta ' + estacionName,
            marker: {
              color: 'rgb(219, 64, 82)',
              size: 9
            },
          };
          
        const pressureLineTrace = {
            x: dateArray,
            y:  pressureArray,
            mode: 'lines',
            name: estacionName,
            line: {
                color: getLineColor(colorId),
                width: 3
            }
        };

        pressureTraces.push(pressureScatterTrace, pressureLineTrace)

        const ecScatterTrace = {
            x: dateArray,
            y: ecAlertArray, 
            mode: 'markers',
            name: 'Alerta ' + estacionName,
            marker: {
              color: 'rgb(219, 64, 82)',
              size: 9
            },
          };
          
        const ecLineTrace = {
            x: dateArray,
            y:  ecArray,
            mode: 'lines',
            name: estacionName,
            line: {
                color: getLineColor(colorId),
                width: 3
            }
        };

        ecTraces.push(ecScatterTrace, ecLineTrace)

    })

    

    /* 
    dateArray tiene la forma

    [
      "Date_Time",
      "Pression [cm H2O]",
      "Etiqueta P",
      "Temperatura [°C]",
      "Etiqueta T",
      "EC [µs/cm]",
      "Etiqueta EC"
    ],
    */
    

    

    const mainComponent = 
    <>
        <DatePickerComponent 
            selectedMinDate={selectedMinDate} handleMinDateChange={handleMinDateChange} 
            selectedMaxDate={selectedMaxDate} handleMaxDateChange={handleMaxDateChange}
        />

        <ActiveNodeChips/>
        
        <Grid item xs={12}>
            <PlotlyChart chartTraces={tempTraces} dataTag='Temperatura (°C)'/>
        </Grid>
        <Grid item xs={12}>
            <PlotlyChart chartTraces={pressureTraces} dataTag='Presión [cm H2O]'/>
        </Grid>
        <Grid item xs={12}>
            <PlotlyChart chartTraces={ecTraces} dataTag='EC [µs/cm]'/>
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