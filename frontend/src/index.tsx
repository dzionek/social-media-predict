/**
 * Entry-point for the React app.
 */

import React from "react"
import {render} from "react-dom"

import "../sass/style.scss"
import App from "./App"


render(
    <App />,
    document.getElementById("app")
)