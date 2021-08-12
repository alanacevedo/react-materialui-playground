import React, { useContext } from 'react'
import { getNodeColor } from '../styles'
import { getNodeData, getNode } from './database'

export const GlobalContext  = React.createContext({
    activeNodes: [],
    setActiveNodes: () => {},
    visibleNodes: [], // marcadores visibles en el mapa
    setVisibleNodes: () => {},
    shouldRefreshVNodes : false,
    setShouldRefreshVNodes : () => {},
    nodeCache: {},
    setNodeCache: () => {},
})

/* 
Custom hook for managing active nodes in charts
usage:  const [activateNode, deactivateNode] = useNodeActivation()
 
        ... activateNode(nodeId)
        */

export const useNodeActivation = () => {
    const { activeNodes, setActiveNodes, nodeCache, setNodeCache } = useContext(GlobalContext)

    const activateNode = (nodeId) => {

        if (!nodeCache.hasOwnProperty(nodeId)) {
            const nodeData = getNodeData(nodeId)
            const cacheLength = Object.keys(nodeCache).length
            const color = getNodeColor(cacheLength)
            const estacionName = getNode(nodeId).estacion

            const cachedData = {
                'data' : nodeData,
                'color': color,
                'estacionName': estacionName
            }

            const nodeCacheCopy = {...nodeCache}
            nodeCacheCopy[nodeId] = cachedData
            setNodeCache(nodeCacheCopy)
            console.log('cached data from node', nodeId  )
        }

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

export const useChartCache = () => {
    const { nodeCache } = useContext(GlobalContext)

    const getCachedNodeData = (nodeId) => {

        if (nodeCache.hasOwnProperty(nodeId)) {
            return nodeCache[nodeId]
        } else {
            console.error(nodeId, 'not in node cache')
        }
    }


    return [getCachedNodeData]
}