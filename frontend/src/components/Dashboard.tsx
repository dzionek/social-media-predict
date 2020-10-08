import React, { useState } from "react"
import { FaYoutube, FaTwitch, FaTwitterSquare } from "react-icons/fa"

import { Platform } from "../utils/types"
import Search from "./Search"

function Dashboard(): JSX.Element {
    const [platform, setPlatform] = useState<Platform>(null)
    const [userName, setUsername] = useState("")

    const opacityStyle = {
        opacity: 0.3
    }

    return (
        <>
            <div id="choose-platform">Choose the platform.</div>

            <div id="platforms">
                <div className="row">

                    <div
                        className="col-md-4"
                    >
                        <div
                            className="icon-div"
                            style={
                                (platform !== null && platform !== "YouTube") ?
                                    opacityStyle : {}
                            }
                            onClick={() => setPlatform("YouTube")}
                        >
                            <FaYoutube className="youtube-icon" />
                            <div>YouTube</div>
                        </div>
                    </div>

                    <div
                        className="col-md-4"
                    >
                        <div
                            className="icon-div"
                            style={
                                (platform !== null && platform !== "Twitch") ?
                                    opacityStyle : {}
                            }
                            onClick={() => setPlatform("Twitch")}
                        >
                            <FaTwitch className="twitch-icon" />
                            <div>Twitch</div>
                        </div>
                    </div>

                    <div
                        className="col-md-4"
                    >
                        <div
                            className="icon-div"
                            style={
                                (platform !== null && platform !== "Twitter") ?
                                    opacityStyle : {}
                            }
                            onClick={() => setPlatform("Twitter")}

                        >
                            <FaTwitterSquare className="twitter-icon" />
                            <div>Twitter</div>
                        </div>
                    </div>

                </div>
            </div>

            <Search
                platform={platform}
                username={userName}
                setUsername={setUsername}
            />
        </>
    )
}

export default Dashboard