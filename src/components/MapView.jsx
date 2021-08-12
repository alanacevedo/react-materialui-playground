import React, { useContext, useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'
import { GlobalContext, useNodeActivation } from '../utils/GlobalContext'
import { getNodes, getNodeData, getNodeData2, getNodeData3 } from '../utils/database'
import ToggleHideButton from './ToggleHideButton';



import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png'; 
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const useStyles = makeStyles((theme) => ({
    leafletContainer: {
        width: '100%',
        height: '50vh',
        marginBottom: '5vh',
    }
  }));


const ToggleButton = (props) => {
    const { activeNodes } = useContext(GlobalContext)
    const [activateNode, deactivateNode] = useNodeActivation()



    if (!activeNodes.includes(props.nodeId)) {
        return (
            <Button variant='contained' color='primary' onClick={() => {activateNode(props.nodeId)}}>
                Agregar datos
            </Button>
        )
    } else {
        return (
            <Button variant='contained' color='primary' onClick={() => {deactivateNode(props.nodeId)}}>
                Quitar datos
            </Button>
        )
    }
    
}

const Markers = () => {
    const data = getNodes()
    const {  setVisibleNodes,  shouldRefreshVNodes, setShouldRefreshVNodes } = useContext(GlobalContext)
    const map = useMap()

    useEffect(() => {
        if (shouldRefreshVNodes) {
            const bounds = map.getBounds()
            // Esto es super ineficiente. Si la cantidad de nodos aumenta, esto tardará  ya que tiene que iterar por todos.
            const visibleNodes = data.filter((obj) => {
                return bounds.contains(obj.coords) 
            }).map((obj) => {
                return obj.id
            })
            setVisibleNodes(visibleNodes)
            setShouldRefreshVNodes(false)
        }
    })

    /*
    // Esto es para probar las consultas

    useEffect(() => {
        getNodeData2().then(
            data => {console.log(data)},
            error => {
                console.error(error)
                console.log('hola')
            })
    })

    useEffect(() => {
        getNodeData3()
    })

    
    // Para generar datos aleatorios
    useEffect(() => {

        function randint(min, max) {
            return Math.random() * (max - min + 1) + min;
          }

        function randomize(x, delta) {
            let n = Number(x)
            return randint(n*(0.8+delta) , (1.2+delta)*n).toString()
        }

        
        let orig = getNodeData(1)
        console.log(orig)
        let copy = {
            ...orig,
            data: orig['data'].map((list) => {
                return [list[0], randomize(list[1], 0), list[2], randomize(list[3], 0), list[4], randomize(list[5], 0), list[6]]
            })}
        console.log(copy)
    })
    */


    return (
        <>
        {data.map((obj) => {
                return (
                <Marker position={obj.coords} key={obj.id}>
                    <Popup>
                        <Typography>
                            {obj.estacion}
                        </Typography>
                        
                        <ToggleButton nodeId={obj.id}/>
                    </Popup>
                </Marker>
                )
            })}
        </>
    )
}



const MapView = () => {
    const classes = useStyles()
    const [shouldHideMap, setShouldHideMap] = useState(false)

    const initialZoom = 7
    const centerCoords = [-33.4500000, -70.6666667]


    const mapComponent = 
    <>
    <MapContainer center={centerCoords} zoom={initialZoom} className={classes.leafletContainer}>
        <TileLayer 
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers/>
    </MapContainer>
    </>

    return (
        <>
        <ToggleHideButton componentString='Mapa' shouldHide={shouldHideMap} setShouldHide={setShouldHideMap}/>
        {
        /* Esta linea hace que varíe lo que se muestra según el valor de shouldHide */
        shouldHideMap ? <></> : mapComponent
        }
        </>

    )
}

export default MapView