import React from 'react'

export const GlobalContext  = React.createContext({
    id: -1,
    setNodeId: () => {},
    visibleNodes: [],
    setVisibleNodes: () => {},
    shouldRefreshVNodes : false,
    setShouldRefreshVNodes : () => {},
})