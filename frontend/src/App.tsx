import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import { SiGithub } from "react-icons/si"

import Dashboard from "./components/Dashboard"
import Result from "./components/Result"
import {Platform} from "./utils/types";


/**
 * The main app component.
 */

const App: React.FC = () => (
    <Router>
        <div id="outer-container" className="container">
            <div id="inner-container">

                <div id="logos">
                    <img src="static/small-logo.png" alt="Logo"/>
                    <a href="https://github.com/dzionek/social-media-predict">
                        <SiGithub className="github-icon" />
                    </a>
                </div>

                <Switch>
                    <Route
                        path="/result"
                        render={routeProps => (
                            <Result state={routeProps.location.state as {username: string, platform: Platform}}/>
                        )}
                    />

                    <Route path="/">
                        <Dashboard/>
                    </Route>
                </Switch>

            </div>
        </div>
    </Router>
)

export default App