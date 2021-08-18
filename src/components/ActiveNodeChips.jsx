import React, { useContext } from 'react'
import { Chip, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import useNodeActivation from '../utils/hooks/useNodeActivation';
import useChartCache from '../utils/hooks/useChartCache';
import ActiveNodesContext from '../utils/context/ActiveNodesContext';
import { getNode } from '../utils/database'

const useStyles = makeStyles((theme) => ({
    chip: {
      margin: theme.spacing(0.5),
    },
  }));

const ActiveNodeChips = () => {
    const classes = useStyles()
    const [, deactivateNode] = useNodeActivation()
    const { activeNodes } = useContext(ActiveNodesContext)
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