import React from "react"
import {render} from "@testing-library/react"

import Dummy from "../components/Dummy"

describe("<Dummy/>", () => {
    it("renders correctly", () => {
        const {getByText} = render(<Dummy/>)
        getByText("React loaded correctly.")
    })
})