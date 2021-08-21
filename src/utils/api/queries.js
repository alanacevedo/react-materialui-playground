export async function getInfoEstacion(nodeIdString) {
    const response = await fetch(`http://agua.niclabs.cl/queries/infoestacion?estacion=${nodeIdString}`,
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

export async function getAllInfoEstacion() {
    const response = await fetch(`http://agua.niclabs.cl/queries/infoestacion`,
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

