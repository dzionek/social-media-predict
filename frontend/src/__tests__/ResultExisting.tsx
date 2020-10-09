import React from "react"
import {render, waitForElementToBeRemoved} from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import axios from "axios"

import Result from "../components/Result"
import { Response } from "../utils/types"

describe("<Result/> existing", async () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("draws a final panel correctly", async () => {
        jest.spyOn(axios, 'post')
            .mockImplementation((): Promise<{data: Response}> => Promise.resolve({
                data: {
                    doesExist: true,
                    insignificant: false,
                    username: "Test User",
                    picture: "https://www.gstatic.com/webp/gallery3/1.png",
                    dates: ["2020-09-01", "2020-09-02", "2020-09-03"],
                    subscribers: [0, 1000, 2000],
                    r: 1,
                    predicted: [["2020-09-03", 2000], ["2020-09-04", 3000], ["2020-09-05", 4000]]
                }
            }))

        const { queryByText, getByText} = render(
            <Router>
                <Result state={{username: '_', platform: 'Twitter'}}/>
            </Router>
        )

        await waitForElementToBeRemoved(() => queryByText("Loading..."), {timeout: 5000})
        getByText("Twitter")
        getByText("Test User")
        getByText("Current followers: 2.00k")
    })
})