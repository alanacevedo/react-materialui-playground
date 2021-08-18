import React from 'react'

const VisibleNodesContext  = React.createContext({
    visibleNodes: [], // marcadores visibles en el mapa
    setVisibleNodes: () => {},
    shouldRefreshVNodes : false,
    setShouldRefreshVNodes : () => {},
})

export default VisibleNodesContext