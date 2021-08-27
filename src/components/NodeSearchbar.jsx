import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Grid, Typography } from '@material-ui/core'
import { getNodes } from '../utils/database';

const NodeSearchbar = (props) => {
    const [selectedNode, setSelectedNode] = useState({estacion: "", id: -1})
    const setCurrentCoords = props.setCurrentCoords
    const nodes = getNodes()

    return(
        <>
        <Grid item container spacing={3} alignItems='center'>
            <Grid item xs={12} md={6}>
                <Autocomplete
                    value={selectedNode}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setSelectedNode(newValue)
                        } else {
                            setSelectedNode({estacion: "", id: -1})
                        }
                    }}
                    options={[...nodes, {estacion: "", id: -1}]}
                    renderInput={(params) => (
                    <TextField {...params} label="Buscar nodo" margin="normal" variant="outlined"/>
                    
                    )}
                    getOptionLabel={(option) =>  option? option.estacion : ""}
                    getOptionSelected={(option, value) => option.id === value.id}
                />
            </Grid>
            <Grid item>
                <Button variant='contained' color='primary' onClick={()=>{
                    if (selectedNode.id !== -1) {
                        setCurrentCoords(selectedNode.coords)
                    }
                    }}>
                    Mostrar en mapa
                </Button>
            </Grid>
        </Grid>
        <Typography>{selectedNode.estacion} {selectedNode.id}</Typography>
        </>
    )
}

export default NodeSearchbar