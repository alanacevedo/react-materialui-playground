import { testData1, testData2, testData3 } from "../static/testData";

export function getNodeData(nodeId) {
    switch (nodeId) {
        case 1:
            return testData1
            
        case 2:
            return testData2
        
        case 3:
            return testData3
        
        default:
            (console.error('Error at node data fetch', nodeId))
            return {}
    }

}