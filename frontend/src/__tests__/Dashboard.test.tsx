import React from "react"
import {fireEvent, render} from "@testing-library/react"

import Dashboard from "../components/Dashboard"

describe("<Dashboard/>", () => {
    it("renders correctly", () => {
        const {getByText} = render(<Dashboard/>)
        getByText("Choose platform")
    })

    it("changes platforms", () => {
        const {getByText, queryByText} = render(<Dashboard/>)

        const youtubeUrl = "youtube.com/user/"
        const facebookUrl = "facebook.com/"
        const twitterUrl = "twitter.com/"

        expect(queryByText(youtubeUrl)).toBeNull()
        expect(queryByText(facebookUrl)).toBeNull()
        expect(queryByText(twitterUrl)).toBeNull()

        const youtubeButton = getByText("YouTube")
        const facebookButton = getByText("Facebook")
        const twitterButton = getByText("Twitter")

        fireEvent.click(youtubeButton)

        expect(youtubeButton.parentElement.style.opacity).toBe("")
        expect(facebookButton.parentElement.style.opacity).toBe("0.3")
        expect(twitterButton.parentElement.style.opacity).toBe("0.3")

        getByText(youtubeUrl)
        expect(queryByText(facebookUrl)).toBeNull()
        expect(queryByText(twitterUrl)).toBeNull()

        fireEvent.click(facebookButton)

        expect(youtubeButton.parentElement.style.opacity).toBe("0.3")
        expect(facebookButton.parentElement.style.opacity).toBe("")
        expect(twitterButton.parentElement.style.opacity).toBe("0.3")

        getByText(facebookUrl)
        expect(queryByText(youtubeUrl)).toBeNull()
        expect(queryByText(twitterUrl)).toBeNull()

        fireEvent.click(twitterButton)

        expect(youtubeButton.parentElement.style.opacity).toBe("0.3")
        expect(facebookButton.parentElement.style.opacity).toBe("0.3")
        expect(twitterButton.parentElement.style.opacity).toBe("")

        getByText(twitterUrl)
        expect(queryByText(youtubeUrl)).toBeNull()
        expect(queryByText(facebookUrl)).toBeNull()
    })
})