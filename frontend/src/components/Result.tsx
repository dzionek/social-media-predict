import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import {Platform} from "../utils/types"

interface ResultProps {
    state: {
        username: string,
        platform: Platform
    }
}

interface Response {
    doesExist: boolean,
    username?: string,
    picture?: string
}

function Result(props: ResultProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [response, setResponse] = useState<Response>(null)

    useEffect(() => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        axios.defaults.xsrfCookieName = "csrftoken"

        axios.post("/predict/", {
            username: props.state.username,
            platform: props.state.platform
        }).then((r: {data: Response}) => {
            setResponse(r.data)
            setIsLoading(false)
        }).catch(error => {
            setIsError(true)
        })
    }, [])

    let content: JSX.Element

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isError) {
        content = <div>An error occurred</div>
    } else {
        console.log(response)
        if (response.doesExist) {
            content =
                <div className="text-center">
                    <img src={response.picture} className="img-thumbnail" alt="Profile picture"/>
                    <h2 className="mt-4">{response.username}</h2>
                    <h5>{props.state.platform}</h5>
                </div>


        } else {
            content = <div>The given user does not exist!</div>
        }
    }

    return (
        <div>
            {content}
            <br/>
            Click <Link to="/">here</Link> to go back.
        </div>
    )
}

export default Result