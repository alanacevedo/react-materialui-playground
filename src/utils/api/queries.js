const apiKey = '919c5e5e086a492398141c1ebd95b711' // Es seguro tener esto aquí?

async function makeRequest(url) {
    
    const response = await fetch(url,
    {
        method: 'GET',
        headers: {
            'query-api-key' : apiKey,
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
