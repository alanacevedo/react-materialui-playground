
import React, { useContext, useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'

import { getNodes, } from '../utils/database'
import ToggleHideButton from './ToggleHideButton';
import NodeSearchbar from './NodeSearchbar';
import ToggleNodeButton from './ToggleNodeButton';


import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png'; 
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import VisibleNodesContext from '../utils/context/VisibleNodesContext';
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


// No renderiza nada, es sólo para aislar la funcionalidad y evitar re-renderizados por actualización de contexto
const NodeCounter = (props) => {
    const {  setVisibleNodes,  shouldRefreshVNodes, setShouldRefreshVNodes } = useContext(VisibleNodesContext) 
    const map = useMap()

    const updateNodes = () => {
        const bounds = map.getBounds()
        const visibleNodes = props.data.filter((obj) => {
            return bounds.contains(obj.coords) 
        }).map((obj) => {
            return obj.id
        })
        setVisibleNodes(visibleNodes)
    }

    useEffect(() => {
        updateNodes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Lista vacía es para que sólo ocurra la primera vez que se renderiza.
    

    useEffect(() => {
        if (shouldRefreshVNodes) {
            updateNodes()
            setShouldRefreshVNodes(false)
        }
    })

    return (<div></div>)

}

const Markers = (props) => {
    

    return (
        <>
        {props.data.map((obj) => {
                return (
                <Marker position={obj.coords} key={obj.id}>
                    <Popup>
                        <Typography>
                            {obj.estacion}
                        </Typography>
                        
                        <ToggleNodeButton nodeId={obj.id}/>
                    </Popup>
                </Marker>
                )
            })}
        </>
    )
}

// No renderiza nada, es sólo para aislar la funcionalidad de cambiar las coordenadas del mapa
const LocationSetter = (props) => {
    const currentCoords = props.currentCoords
    const map = useMap()

    useEffect(() => {
        map.flyTo(currentCoords, 11)
    }, [currentCoords, map])




    return <div></div>
}


const MapView = () => {
    const classes = useStyles()
    const [shouldHideMap, setShouldHideMap] = useState(false)
    const data = getNodes()
    const initialZoom = 7
    const centerCoords = [-33.4500000, -70.6666667]
    const [currentCoords, setCurrentCoords] = useState(centerCoords)

    const markers = <Markers data={data}/>
    const nodeCounter = <NodeCounter data={data}/>
    const locationSetter = <LocationSetter currentCoords={currentCoords}/>

    const mapComponent = 
    <>
    <MapContainer center={centerCoords} zoom={initialZoom} className={classes.leafletContainer}>
        <TileLayer 
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
        {nodeCounter}
        {locationSetter}

        
    </MapContainer>
    </>

    return (
        // aqui agregar un context para la ubicación? -> mejor pasar el setCoords como props a NodeSearchbar
        <>
        <ToggleHideButton componentString='Mapa' shouldHide={shouldHideMap} setShouldHide={setShouldHideMap}/>
        {
        /* Esta linea hace que varíe lo que se muestra según el valor de shouldHide */
        shouldHideMap ? <></> : <><NodeSearchbar setCurrentCoords={setCurrentCoords}/> {mapComponent} </>
        }
        </>

    )
}

export default MapView