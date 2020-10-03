import React from "react"
import { SiGithub } from "react-icons/si"
import { FaYoutube, FaFacebookSquare, FaTwitterSquare } from "react-icons/fa"


function Dashboard(): JSX.Element {

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

                    <div className="col-md-4">
                        <div className="icon-div">
                            <FaYoutube className="youtube-icon" />
                            <div>YouTube</div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="icon-div">
                            <FaFacebookSquare className="facebook-icon" />
                            <div>Facebook</div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="icon-div">
                            <FaTwitterSquare className="twitter-icon" />
                            <div>Twitter</div>
                        </div>
                    </div>

                </div>
            </div>

            <div id="enter-name">Now, enter the username</div>
            <div id="search">
                <div>
                    <span>youtube.com/user/</span><input/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4"/>
                <div id="predict-div" className="col-md-4">
                    <button id="predict-button">Predict</button>
                </div>
                <div className="col-md-4"/>
            </div>
        </div>
    )
}

export default Dashboard