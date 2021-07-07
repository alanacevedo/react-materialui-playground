import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { makeStyles } from '@material-ui/core/styles'
import 'leaflet/dist/leaflet.css'

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

const MapView = () => {
    const classes = useStyles()
    const initialZoom = 7
    const coords = [
        [-33.4500000, -70.6666667],
        [-33.2, -70.6666667],
        [-33.3, -71]
    ]
    return (
        <>
        <MapContainer center={coords[0]} zoom={initialZoom} className={classes.leafletContainer}>
            <TileLayer 
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {coords.map((coord, index) => {
                return (<>
                <Marker position={coord}>
                <Popup>
                    <Typography>
                        Popup Info {index + 1}
                    </Typography>
                </Popup>
            </Marker>
            </>)
            })}
            
            
        </MapContainer>
        </>
    )
}

export default MapView