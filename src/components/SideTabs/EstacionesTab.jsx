import React, { useContext } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import NodeCard from './NodeCard';
import { getNode } from '../../utils/database';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Paper} from '@material-ui/core/';
import { GlobalContext } from '../../utils/GlobalContext'

const EstacionesTab = () => {
    const { visibleNodes, setShouldRefreshVNodes } = useContext(GlobalContext)

    return (
        <>
            <Typography>
            Las estaciones actualmente visibles en el mapa son: 

            <IconButton onClick={() => {setShouldRefreshVNodes(true)}}>
                <RefreshIcon/>
            </IconButton>
            </Typography>
            <Paper style={{maxHeight: '45vh', overflow: 'auto'}}>
            {
                visibleNodes.map((nodeId) => {
                const nodeData = getNode(nodeId)
                return (<NodeCard nombreEstacion={nodeData['estacion']} coords={nodeData['coords']}/>)
                })
            }
            </Paper>
        </>
    )
}

export default EstacionesTab