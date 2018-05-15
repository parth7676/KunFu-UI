import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import routes from './routes'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import 'css/main.scss'
import 'react-select/dist/react-select.css';
import "react-bootstrap-table/css/react-bootstrap-table.css"
import 'bootstrap-sass/assets/javascripts/bootstrap.min.js'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
    , document.getElementById('app'))
