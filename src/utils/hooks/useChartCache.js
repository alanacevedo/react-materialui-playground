import { useContext } from 'react'
import NodeCacheContext from '../context/NodeCacheContext'

/* 
Custom hook for managing active nodes in charts
usage:  const [activateNode, deactivateNode] = useNodeActivation()
 
        ... activateNode(nodeId)
*/

const useChartCache = () => {
    const { nodeCache } = useContext(NodeCacheContext)

    const getCachedNodeData = (nodeId) => {

        if (nodeCache.hasOwnProperty(nodeId)) {
            return nodeCache[nodeId]
        } else {
            console.error(nodeId, 'not in node cache')
        }
    }


    return [getCachedNodeData]
}

export default useChartCache