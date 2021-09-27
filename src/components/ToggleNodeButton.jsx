import React, { useContext  } from 'react'
import ActiveNodesContext from '../utils/context/ActiveNodesContext';
import useNodeActivation from '../utils/hooks/useNodeActivation';
import { Button } from '@material-ui/core'

const ToggleNodeButton = (props) => {
    const { activeNodes } = useContext(ActiveNodesContext)
    const [activateNode, deactivateNode] = useNodeActivation()

    if (!activeNodes.includes(props.nodeId)) {
        return (
            <Button variant='contained' color='primary' onClick={() => {activateNode(props.nodeId)}}>
                Agregar datos
            </Button>
        )
    } else {
        return (
            <Button variant='contained' color='primary' onClick={() => {deactivateNode(props.nodeId)}}>
                Quitar datos
            </Button>
        )
    }
}

export default ToggleNodeButton