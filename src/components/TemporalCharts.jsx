import React, { useContext, useState } from 'react';
import ActiveNodesContext from '../utils/context/ActiveNodesContext';
import { Grid } from '@material-ui/core'
import ToggleHideButton from './ToggleHideButton';

const TemporalCharts = () => {
    const { activeNodes } = useContext(ActiveNodesContext)
    const [shouldHideCharts, setShouldHideCharts] = useState(true)

    if (activeNodes.length !== 1) {
        return (<></>)
    } 

    const mainComponent = 
    <>
        hola
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