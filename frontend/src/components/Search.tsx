import React, { Dispatch, SetStateAction } from "react"

import { Platform } from "../utils/types"

interface SearchProps {
    platform: Platform,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>
}

function Search(props: SearchProps): JSX.Element {
    let searchDiv: JSX.Element

    const usernameInput =
        <input
            placeholder="username"
            value={props.username}
            onChange={event => props.setUsername(event.target.value)}
        />

    switch (props.platform) {
        case "Facebook":
            searchDiv =
                <>
                    <div id="enter-name">Now, enter the username</div>
                    <div id="search">
                        <div>
                            <span>facebook.com/</span>{usernameInput}
                        </div>
                    </div>
                </>
            break

        case "Twitter":
            searchDiv =
                <>
                    <div id="enter-name">Now, enter the username</div>
                    <div id="search">
                        <div>
                            <span>twitter.com/</span>{usernameInput}
                        </div>
                    </div>
                </>
            break

        case "Youtube":
            searchDiv =
                <>
                    <div id="enter-name">Now, enter the username</div>
                    <div id="search">
                        <div>
                            <span>youtube.com/user/</span>{usernameInput}
                        </div>
                    </div>
                </>
    }

    let result: JSX.Element = null

    if(props.platform !== null) {
        result =
            <>
                {searchDiv}
                <div className="row">
                    <div className="col-md-4"/>
                    <div id="predict-div" className="col-md-4">
                        <button
                            id="predict-button"
                            onClick={() =>
                                console.log(
                                    `Request sent: username=${props.username}, platform=${props.platform}`
                                )
                            }
                        >
                            Predict
                        </button>
                    </div>
                    <div className="col-md-4"/>
                </div>
            </>
    }

    return result
}

export default Search