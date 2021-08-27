import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Typography } from '@material-ui/core'
import { getNodes } from '../utils/database';

const NodeSearchbar = (props) => {
    const [selectedNode, setSelectedNode] = useState({estacion: "", id: -1})
    const nodes = getNodes()

    return(
        <>
        <Grid item xs={12} md={6}>
            <Autocomplete
                value={selectedNode}
                onChange={(event, newValue) => {
                    if (newValue) {
                        setSelectedNode(newValue)
                    } else {
                        setSelectedNode({estacion: "", id: -1})
                    }
                    console.log(selectedNode)
                    
                }}
                options={[... nodes, {estacion: "", id: -1}]}
                renderInput={(params) => (
                <TextField {...params} label="Buscar nodo" margin="normal" variant="outlined"/>
                
                )}
                getOptionLabel={(option) =>  option? option.estacion : ""}
                getOptionSelected={(option, value) => option.id === value.id}
            />
        </Grid>
        <Typography>{selectedNode.estacion} {selectedNode.id}</Typography>
        </>
    )
}

export default NodeSearchbar