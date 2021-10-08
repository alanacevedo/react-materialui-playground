import React, { useContext, useState } from 'react';
import ActiveNodesContext from '../utils/context/ActiveNodesContext';
import { Grid } from '@material-ui/core'
import ToggleHideButton from './ToggleHideButton';
import useChartCache from '../utils/hooks/useChartCache';
import { setDate, setHours, setMinutes } from 'date-fns'
import { PlotlyChart } from './PlotlyCharts'

const TemporalCharts = () => {
    const { activeNodes } = useContext(ActiveNodesContext)
    const [shouldHideCharts, setShouldHideCharts] = useState(true)
    const [getCachedNodeData] = useChartCache()
    
    if (activeNodes.length !== 1) {
        return (<></>)
    } 

    const nodeData = getCachedNodeData(activeNodes[0])
    const dataArray = nodeData['data']['data']
    const tempTraces = [];
    const pressureTraces = [];
    const ecTraces = [];

    const earliestDate = new Date(dataArray[0][0])
    const earliestMonth = earliestDate.getMonth()
    const earliestYear = earliestDate.getFullYear()

    // El plan es ir llenando los arreglos y cuando se cambie de mes pushearlo al trace array correspondiente y empezar de nuevo
    
    let currentMonth = earliestMonth;
    let currentYear = earliestYear;
    let dateArray = [];
    let tempArray = [];
    let pressureArray = [];
    let ecArray = [];


    // #TODO:  idealmente se haría una busqueda (binaria?) y luego copiar slices grandes, no uno a uno.
    dataArray.forEach((item, index) => {

        /*
            "headers": [
            "Date_Time",
            "Pression [cm H2O]",
            "Etiqueta P",
            "Temperatura [°C]",
            "Etiqueta T",
            "EC [µs/cm]",
            "Etiqueta EC"
        ],
        */

        const date = new Date(item[0])
        if (date.getMonth() === currentMonth) {
            // Se genera una nueva date obviando el año
            let normalizedDate = new Date()
            normalizedDate = setDate(normalizedDate, date.getDate())
            normalizedDate = setHours(normalizedDate, date.getHours())
            normalizedDate = setMinutes(normalizedDate, date.getMinutes())

            dateArray.push(normalizedDate);
            tempArray.push(item[3]);
            pressureArray.push(item[1]);
            ecArray.push(item[5]);


        } else {
            // Cambio de mes, se genera trace


            const tempLineTrace = {
                x: dateArray,
                y:  tempArray,
                mode: 'lines',
                name: ``,
                line: {
                    width: 3
                },
                hovertemplate: `%{x|%d} ${getMonthName(currentMonth)} ${currentYear} %{x|%H:%M} <br> Valor: %{y} `,
            };

            const pressureLineTrace = {
                x: dateArray,
                y:  pressureArray,
                mode: 'lines',
                name: ``,
                line: {
                    width: 3
                },
                hovertemplate: `%{x|%d} ${getMonthName(currentMonth)} ${currentYear} %{x|%H:%M} <br> Valor: %{y} `
            };

            const ecLineTrace = {
                x: dateArray,
                y:  ecArray,
                mode: 'lines',
                name: ``,
                line: {
                    width: 3
                },
                hovertemplate: `%{x|%d} ${getMonthName(currentMonth)} ${currentYear} %{x|%H:%M} <br> Valor: %{y} `
            };

            tempTraces.push(tempLineTrace);
            pressureTraces.push(pressureLineTrace);
            ecTraces.push(ecLineTrace);
            dateArray = [];
            tempArray = [];
            pressureArray = [];
            ecArray = [];
            currentMonth = date.getMonth();
            currentYear = date.getFullYear();
        }
        // Se salta el último mes, revisar.
    })

    console.log(tempTraces)

    

    const mainComponent = 
    <>
        <Grid item xs={12}>
            <PlotlyChart chartTraces={tempTraces} dataTag='Temperatura (°C)' threshold={15} hideMonth={true}/>
        </Grid>
        <Grid item xs={12}>
            <PlotlyChart chartTraces={pressureTraces} dataTag='Presión [cm H2O]' threshold={1300} hideMonth={true}/>
        </Grid>
        <Grid item xs={12}>
            <PlotlyChart chartTraces={ecTraces} dataTag='EC [µs/cm]' threshold={250} hideMonth={true}/>
        </Grid>
    </>

    return (
    <> 
        <Grid container item xs md={3} alignItems='center'>
            <ToggleHideButton componentString='comp. temporal' shouldHide={shouldHideCharts} setShouldHide={setShouldHideCharts}/>
        </Grid>
        {
        /* Esta linea hace que varíe lo que se muestra según el valor de shouldHide */
        shouldHideCharts ? <></> : mainComponent
        }
    </>
    )
}

function getMonthName(monthNumber) {
    switch (monthNumber){
        case 0:
            return 'Enero'
        case 1:
            return 'Febrero'
        case 2:
            return 'Marzo'
        case 3:
            return 'Abril'
        case 4:
            return 'Mayo'
        case 5:
            return 'Junio'
        case 6:
            return 'Julio'
        case 7:
            return 'Agosto'
        case 8:
            return 'Septiembre'
        case 9:
            return 'Octubre'
        case 10:
            return 'Noviembre'
        case 11:
            return 'Diciembre'
        default:
            console.error(`getMonthName error: month number ${monthNumber} not valid`)
            return null
    }
}

export default TemporalCharts