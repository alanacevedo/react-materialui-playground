import React, { useContext } from 'react'
import { Chip, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext, useNodeActivation, useChartCache } from '../utils/GlobalContext';
import { getNode } from '../utils/database'

const useStyles = makeStyles((theme) => ({
    chip: {
      margin: theme.spacing(0.5),
    },
  }));

const ActiveNodeChips = () => {
    const classes = useStyles()
    const [, deactivateNode] = useNodeActivation()
    const { activeNodes } = useContext(GlobalContext)
    const [getCachedNodeData, ] = useChartCache()
    
    return(
        <>
            <Grid container item xs>
                
                {activeNodes.map((nodeId, index) => {
                    const color = getCachedNodeData(nodeId)['color']

                    return ( 
                            <Chip 
                                style={{backgroundColor:color}} className={classes.chip} 
                                color='primary' onDelete={() => deactivateNode(nodeId)} label={getNode(nodeId).estacion}
                                key={nodeId}
                            />            
                )})}

            </Grid>
        </>
    )
    
}

export default ActiveNodeChips