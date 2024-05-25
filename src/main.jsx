import React from 'react'
import  ReactDOM  from 'react-dom/client'
import debounce from "lodash.debounce";
import { BrowserRouter } from 'react-router-dom'
import App from '/src/App.jsx'
import {store} from './components/redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>,
)