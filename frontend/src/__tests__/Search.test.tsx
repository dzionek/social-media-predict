import React from "react"
import {fireEvent, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Dashboard from "../components/Dashboard"

describe("<Search/>", () => {
    it("logs the correct parameters", () => {
        const consoleOutput: string[] = []

        jest.spyOn(console, 'log')
            .mockImplementationOnce((message: string) => consoleOutput.push(message))

        const {getByText, getByPlaceholderText} = render(<Dashboard/>)

        fireEvent.click(getByText("YouTube"))
        userEvent.type(getByPlaceholderText("username"), "testUser")
        fireEvent.click(getByText("Predict"))

        expect(consoleOutput[0]).toContain("username=testUser")
        expect(consoleOutput[0]).toContain("platform=Youtube")
    })
})