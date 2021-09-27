import React from 'react';
import { useEffect } from 'react';
import { getAllInfoEstacion, getDataEstacion, getEstaciones, getInfoEstacion, getAlertaEstacion } from '../utils/api/queries';

/*
Este componente es para uso durante el desarrollo, para probar utilidades
*/

const TestingComponent = () => {

    useEffect(() => {
        getInfoEstacion('7').then((results) => console.log('getInfoEstacion 7', results))
        getAllInfoEstacion().then((results => console.log('getAllInfoEstacion', results)))
        getEstaciones().then((results => console.log('getEstaciones', results)))
        getDataEstacion('7').then((results) => console.log('getDataEstacion 7', results))
        getAlertaEstacion('horcon').then((results) => console.log('getAlertaEstacion horcon', results))
    }, [])

    return (<div></div>)
}

export default TestingComponent