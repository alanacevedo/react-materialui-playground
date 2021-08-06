import React from 'react'

export const GlobalContext  = React.createContext({
    activeNodes: [],
    setActiveNodes: () => {},
    visibleNodes: [], // marcadores visibles en el mapa
    setVisibleNodes: () => {},
    shouldRefreshVNodes : false,
    setShouldRefreshVNodes : () => {},
})