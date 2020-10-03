import React from 'react'
import Dashboard from "./components/Dashboard"


/**
 * The main app component.
 */

const App: React.FC = () => (
    <div id="outer-container" className="container">
        <Dashboard/>
    </div>
)

export default App