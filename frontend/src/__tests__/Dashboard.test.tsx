import React from "react"
import {fireEvent, render} from "@testing-library/react"

import Dashboard from "../components/Dashboard"

describe("<Dashboard/>", () => {
    it("renders correctly", () => {
        const {getByText} = render(<Dashboard/>)
        getByText("Choose the platform.")
    })

    it("changes platforms", () => {
        const {getByText, queryByText} = render(<Dashboard/>)

        const youtubeUrl = "youtube.com/channel/"
        const twitchUrl = "twitch.tv/"
        const twitterUrl = "twitter.com/"

        expect(queryByText(youtubeUrl)).toBeNull()
        expect(queryByText(twitchUrl)).toBeNull()
        expect(queryByText(twitterUrl)).toBeNull()

        const youtubeButton = getByText("YouTube")
        const twitchButton = getByText("Twitch")
        const twitterButton = getByText("Twitter")

        fireEvent.click(youtubeButton)

        expect(youtubeButton.parentElement.style.opacity).toBe("")
        expect(twitchButton.parentElement.style.opacity).toBe("0.3")
        expect(twitterButton.parentElement.style.opacity).toBe("0.3")

        getByText(youtubeUrl)
        expect(queryByText(twitchUrl)).toBeNull()
        expect(queryByText(twitterUrl)).toBeNull()

        fireEvent.click(twitchButton)

        expect(youtubeButton.parentElement.style.opacity).toBe("0.3")
        expect(twitchButton.parentElement.style.opacity).toBe("")
        expect(twitterButton.parentElement.style.opacity).toBe("0.3")

        getByText(twitchUrl)
        expect(queryByText(youtubeUrl)).toBeNull()
        expect(queryByText(twitterUrl)).toBeNull()

        fireEvent.click(twitterButton)

        expect(youtubeButton.parentElement.style.opacity).toBe("0.3")
        expect(twitchButton.parentElement.style.opacity).toBe("0.3")
        expect(twitterButton.parentElement.style.opacity).toBe("")

        getByText(twitterUrl)
        expect(queryByText(youtubeUrl)).toBeNull()
        expect(queryByText(twitchUrl)).toBeNull()
    })
})