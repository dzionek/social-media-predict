import React from "react"
import {fireEvent, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Dashboard from "../components/Dashboard"

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}))

describe("<Search/>", () => {
    it("logs the correct parameters", () => {

        const consoleOutput: string[] = []

        const {getByText, getByPlaceholderText} = render(<Dashboard/>)

        fireEvent.click(getByText("YouTube"))

        fireEvent.click(getByText("Predict"))
        expect(consoleOutput).toEqual([])

        userEvent.type(getByPlaceholderText("user code"), "testUser")
        fireEvent.click(getByText("Predict"))

        expect(mockHistoryPush)
            .toHaveBeenCalledWith(
            "/result", {"platform": "YouTube", "username": "testUser"}
            )
    })
})