import React from "react"
import {render} from "@testing-library/react"

import Dashboard from "../components/Dashboard"

describe("<Dummy/>", () => {
    it("renders correctly", () => {
        const {getByText} = render(<Dashboard/>)
        getByText("Choose platform")
    })
})