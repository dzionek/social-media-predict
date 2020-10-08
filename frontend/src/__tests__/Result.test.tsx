import React from "react"
import { render } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'

import Result from "../components/Result"

describe("<Result/>", () => {
    global.URL.createObjectURL = jest.fn(() => 'mocked')
    it("renders correctly", () => {
        const { getByText } = render(
                <Router>
                    <Result state={{username: 'testUser', platform: 'YouTube'}}/>
                </Router>
            )

        getByText("Loading...")
    })
})