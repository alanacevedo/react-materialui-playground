import { testData1, testData2, testData3, testNodes } from "../static/testData";

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

export function getNodes() {
    return testNodes['nodes']
}

export function getNode(nodeId) {
    let node = null

    /* .every() es como forEach() pero cuando se retorna falso se detiene el loop, como un break. */

    testNodes['nodes'].every((obj) => {
        if (obj.id === nodeId) {
            node = obj
            return false  
        }
        return true
    })

    if (node === null) console.error('node with id', nodeId, 'not found')
    return node
}



export async function getNodeData2(nodeIdString) {
    const response = await fetch("http://agua.niclabs.cl/queries/infoestacion?estacion=7",
    {
        method: 'GET',
        headers: {
            'query-api-key' : '919c5e5e086a492398141c1ebd95b711',
            'Content-Type': 'Application/json'
        },
        mode: 'cors',

    })

    return response.json()
}

export function getNodeData3() {
    var url = "http://agua.niclabs.cl/queries/infoestacion?estacion=7";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("query-api-key", "919c5e5e086a492398141c1ebd95b711");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send();
}
