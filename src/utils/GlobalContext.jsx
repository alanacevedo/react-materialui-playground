import React, { useContext } from 'react'

export const GlobalContext  = React.createContext({
    activeNodes: [],
    setActiveNodes: () => {},
    visibleNodes: [], // marcadores visibles en el mapa
    setVisibleNodes: () => {},
    shouldRefreshVNodes : false,
    setShouldRefreshVNodes : () => {},
})

/* 
Custom hook for managing active nodes in charts
usage:  const [activateNode, deactivateNode] = useNodeActivation()
 
        ... activateNode(nodeId)
        */

export const useNodeActivation = () => {
    const { activeNodes, setActiveNodes } = useContext(GlobalContext)

    const activateNode = (nodeId) => {
        setActiveNodes([...activeNodes, nodeId]) // el ... hace una copia de activeNodes (es mala idea hacer un push que modifique el objeto)
    }

    const deactivateNode = (nodeId) => {
        const nodes = [...activeNodes] // es como un .copy()

        const nodeIndex = nodes.indexOf(nodeId)

        if (nodeIndex > -1) {
            nodes.splice(nodeIndex, 1) // elimina 1 elemento en el índice indicado
        } else {
            console.error('node ' + nodeIndex.toString() + ' not in activeNodes')
        }

        setActiveNodes(nodes)
    }

    return [activateNode, deactivateNode]

}