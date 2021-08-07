import React, { useContext } from 'react'
import { Chip, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext, useNodeActivation } from '../utils/GlobalContext';
import { getLineColor } from '../styles'
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
    
    return(
        <>
            <Grid container item xs>
                
                {activeNodes.map((nodeId, index) => {
                    const color = getLineColor(index)

                    return ( 
                            <Chip 
                                style={{backgroundColor:color}} className={classes.chip} 
                                color='primary' onDelete={() => deactivateNode(nodeId)} label={getNode(nodeId).estacion}
                            />            
                )})}

            </Grid>
        </>
    )
    
}

export default ActiveNodeChips