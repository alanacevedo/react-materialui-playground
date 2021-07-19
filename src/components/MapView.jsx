import React, { useContext } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'
import { GlobalContext } from '../utils/GlobalContext'
import { getNodes } from '../utils/database'

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

const MapView = (props) => {
    const classes = useStyles()
    const { setNodeId } = useContext(GlobalContext)
    
    const initialZoom = 7
    const data = getNodes()
    return (
        <>
        <MapContainer center={[-33.4500000, -70.6666667]} zoom={initialZoom} className={classes.leafletContainer}>
            <TileLayer 
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {data.map((obj) => {
                return (<>
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
            
            
        </MapContainer>
        </>
    )
}

export default MapView