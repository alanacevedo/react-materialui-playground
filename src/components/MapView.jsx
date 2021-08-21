import React, { useContext, useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'
import ActiveNodesContext from '../utils/context/ActiveNodesContext';
import useNodeActivation from '../utils/hooks/useNodeActivation';
import { getNodes, } from '../utils/database'
import ToggleHideButton from './ToggleHideButton';



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


const ToggleButton = (props) => {
    const { activeNodes } = useContext(ActiveNodesContext)
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
    const data = getNodes()
    const initialZoom = 7
    const centerCoords = [-33.4500000, -70.6666667]

    const markers = <Markers data={data}/>
    const nodeCounter = <NodeCounter data={data}/>

    const mapComponent = 
    <>
    <MapContainer center={centerCoords} zoom={initialZoom} className={classes.leafletContainer}>
        <TileLayer 
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
        {nodeCounter}

        
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