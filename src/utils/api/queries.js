
const QUERY_API_KEY = process.env.REACT_APP_QUERY_API_KEY

async function makeRequest(url) {
    
    const response = await fetch(url,
    {
        method: 'GET',
        headers: {
            'query-api-key' : QUERY_API_KEY,
            'Content-Type': 'Application/json'
        },
        mode: 'cors',

    })

    return response.json()

}

export async function getInfoEstacion(nodeIdString) {
    return makeRequest(`http://agua.niclabs.cl/queries/infoestacion?estacion=${nodeIdString}`)  
}

export async function getAllInfoEstacion() {
    return makeRequest(`http://agua.niclabs.cl/queries/infoestacion`)
}

export async function getEstaciones() {
    return makeRequest(`http://agua.niclabs.cl/queries/estaciones`)
}

export async function getDataEstacion(nodeIdString) {
    return makeRequest(`http://agua.niclabs.cl/queries/dataestaciones?estacion=${nodeIdString}`)  
}

export async function getAlertaEstacion(nodeIdString) {
    return makeRequest(`http://agua.niclabs.cl/queries/etiquetasestacion?estacion=${nodeIdString}`)
}