import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {wrapper} from "../redux/store"
import { Provider } from 'react-redux'


const App = ({ Component, ...rest }: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest)
    

  return (
    <Provider store={store}> 
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default App
