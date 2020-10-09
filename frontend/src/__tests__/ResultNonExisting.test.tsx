import React from "react"
import {render, waitForElementToBeRemoved} from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import axios from "axios"

import Result from "../components/Result"
import { Response } from "../utils/types"

describe("<Result/> non-existing", () => {
    global.URL.createObjectURL = jest.fn(() => 'mocked')

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("renders correctly", () => {
        const {getByText} = render(
            <Router>
                <Result state={{username: 'testUser', platform: 'YouTube'}}/>
            </Router>
        )

        getByText("Loading...")
    })

    it('displays message if user does not exist', async () => {
        jest.spyOn(axios, 'post')
            .mockImplementation((): Promise<{data: Response}> => Promise.resolve({
                data: {
                    doesExist: false
                }
            }))

        const { queryByText, getByText } = render(
                <Router>
                    <Result state={{username: '_', platform: 'YouTube'}}/>
                </Router>
            )

        await waitForElementToBeRemoved(() => queryByText("Loading..."), {timeout: 3000})
        getByText("The given user does not exist.")
    })

    it('displays message if user has too few subscribers', async () => {
        jest.spyOn(axios, 'post')
            .mockImplementation((): Promise<{data: Response}> => Promise.resolve({
                data: {
                    doesExist: true,
                    insignificant: true,
                }
            }))

        const { queryByText, getByText } = render(
                <Router>
                    <Result state={{username: '_', platform: 'Twitter'}}/>
                </Router>
            )

        await waitForElementToBeRemoved(() => queryByText("Loading..."), {timeout: 3000})
        getByText("The given user has too few followers.")
    })
})