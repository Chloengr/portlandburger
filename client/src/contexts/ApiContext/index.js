import React from 'react'
import services from './services'

const ApiContext = React.createContext(services)

export const ApiProvider = (props) => {
  return <ApiContext.Provider value={services} {...props} />
}

export const useApi = () => React.useContext(ApiContext)