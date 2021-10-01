import React, { useContext, useState } from 'react';
import ActiveNodesContext from '../utils/context/ActiveNodesContext';
import { Grid } from '@material-ui/core'
import ToggleHideButton from './ToggleHideButton';
import useChartCache from '../utils/hooks/useChartCache';
import { setMonth, setDate, setHours, setMinutes } from 'date-fns'
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

    const earliestDate = new Date(dataArray[0][0])
    const earliestMonth = earliestDate.getMonth()
    const earliestYear = earliestDate.getFullYear()

    // El plan es ir llenando los arreglos y cuando se cambie de mes pushearlo al trace array correspondiente y empezar de nuevo
    
    let currentMonth = earliestMonth;
    let currentYear = earliestYear;
    let dateArray = [];
    let tempArray = [];


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

        } else {
            // Cambio de mes, se genera trace


            const tempLineTrace = {
                x: dateArray,
                y:  tempArray,
                mode: 'lines',
                name: `${currentMonth} ${currentYear}`,
                line: {
                    width: 3
                }
            };

            tempTraces.push(tempLineTrace);
            dateArray = [];
            tempArray = [];
            currentMonth = date.getMonth();
            currentYear = date.getFullYear();
        }
        // Se salta el último mes, revisar.
    })

    console.log(tempTraces)

    

    const mainComponent = 
    <>
        <Grid item xs={12}>
            <PlotlyChart chartTraces={tempTraces} dataTag='Temperatura (°C)' threshold={15}/>
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

export default TemporalCharts