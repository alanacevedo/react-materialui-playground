import React from 'react'


const ActiveNodesContext  = React.createContext({
    activeNodes: [],
    setActiveNodes: () => {},
})

export default ActiveNodesContext
