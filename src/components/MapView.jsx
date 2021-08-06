import React, { useContext, useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'
import { GlobalContext } from '../utils/GlobalContext'
import { getNodes, getNodeData2, getNodeData3 } from '../utils/database'
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

const Markers = () => {
    const data = getNodes()
    const { setNodeId, setVisibleNodes,  shouldRefreshVNodes, setShouldRefreshVNodes } = useContext(GlobalContext)
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

    */
    

    return (
        <>
        {data.map((obj) => {
                return (
                <>
                <Marker position={obj.coords}>
                    <Popup>
                        <Typography>
                            Popup Info {obj.id}
                        </Typography>
                        <Button variant='contained' color='primary' onClick={() => {setNodeId(obj.id)}}>
                            Ver datos
                        </Button>
                    </Popup>
                </Marker>
                </>)
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