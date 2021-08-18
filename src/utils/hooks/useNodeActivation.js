import { useContext } from 'react'
import ActiveNodesContext from '../context/ActiveNodesContext'
import NodeCacheContext from '../context/NodeCacheContext'
import { getNodeData, getNode } from '../database'
import { getNodeColor } from '../../styles'

const useNodeActivation = () => {
    const { activeNodes, setActiveNodes } = useContext(ActiveNodesContext)
    const { nodeCache, setNodeCache } = useContext(NodeCacheContext)

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

export default useNodeActivation