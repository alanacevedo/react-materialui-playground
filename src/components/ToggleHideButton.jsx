import React, { useContext, useEffect } from 'react'
import { Button, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const ToggleHideButton = (props) => {
    const { componentString, shouldHide, setShouldHide } = props

    const toggleHide = () => {
        setShouldHide(!shouldHide)
    }

    return (
        <>
        <Button variant='contained' color='primary' onClick={toggleHide}>
            {shouldHide? <>Mostrar {componentString} <AddIcon/></> : <>Ocultar {componentString} <RemoveIcon/></>}
        </Button>
        </>
    )
}

export default ToggleHideButton