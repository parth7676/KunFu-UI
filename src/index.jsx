import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import routes from './routes'
import 'css/main.scss'
import "react-bootstrap-table/css/react-bootstrap-table.css"
import 'bootstrap-sass/assets/javascripts/bootstrap.min.js'


ReactDOM.render(
    <BrowserRouter>
      {routes}
    </BrowserRouter>
    , document.getElementById('app'))
