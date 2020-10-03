import React, { useState } from "react"
import { SiGithub } from "react-icons/si"
import { FaYoutube, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa"

import { Platform } from "../utils/types"
import Search from "./Search"

function Dashboard(): JSX.Element {
    const [platform, setPlatform] = useState<Platform>(null)
    const [userName, setUsername] = useState("")

    const opacityStyle = {
        opacity: 0.3
    }

    return (
        <div id="inner-container">
            <div id="logos">
                <img src="static/small-logo.png" alt="Logo"/>
                <a href="https://github.com/dzionek/social-media-predict">
                    <SiGithub className="github-icon" />
                </a>
            </div>

            <div id="choose-platform">Choose platform</div>

            <div id="platforms">
                <div className="row">

                    <div
                        className="col-md-4"
                        onClick={() => setPlatform("Youtube")}
                    >
                        <div
                            className="icon-div"
                            style={
                                (platform !== null && platform !== "Youtube") ?
                                    opacityStyle : {}
                            }
                        >
                            <FaYoutube className="youtube-icon" />
                            <div>YouTube</div>
                        </div>
                    </div>

                    <div
                        className="col-md-4"
                        onClick={() => setPlatform("Facebook")}
                    >
                        <div
                            className="icon-div"
                            style={
                                (platform !== null && platform !== "Facebook") ?
                                    opacityStyle : {}
                            }
                        >
                            <FaFacebookSquare className="facebook-icon" />
                            <div>Facebook</div>
                        </div>
                    </div>

                    <div
                        className="col-md-4"
                        onClick={() => setPlatform("Twitter")}
                    >
                        <div
                            className="icon-div"
                            style={
                                (platform !== null && platform !== "Twitter") ?
                                    opacityStyle : {}
                            }
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

        </div>
    )
}

export default Dashboard