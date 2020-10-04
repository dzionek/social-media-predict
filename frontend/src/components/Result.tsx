import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Plot from "react-plotly.js"

import {Platform} from "../utils/types"

interface ResultProps {
    state: {
        username: string,
        platform: Platform,
    }
}

interface Response {
    doesExist: boolean,
    username?: string,
    picture?: string,
    subscribers?: [string, string, string]
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
                    <div className="row">
                        <div className="col-md-4"/>
                        <div className="col-md-4">
                            <div className="media">
                                <img src={response.picture} className="img-thumbnail mr-3" alt="Profile picture"/>
                                <div className="media-body text-left">
                                    <h2 className="mt-0">{response.username}</h2>
                                    <h5>{props.state.platform}</h5>
                                    <div>Current subscribers: {response.subscribers[response.subscribers.length - 1][2]}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"/>
                    </div>
                    <div>
                        <Plot
                            className="plot"
                            data={[
                                {
                                    x: response.subscribers.map(item => item[0]),
                                    y: response.subscribers.map(item => item[1]),
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: {
                                        size: 15,
                                        color: '#636EFA'
                                    }
                                }
                                ]}
                            layout={{
                                autosize: true,
                                title: `Prediction of subscribers for ${response.username}`,
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                font: {
                                    color: 'white',
                                    size: 15
                                },
                                xaxis: {
                                    showgrid: false
                                },
                                yaxis: {
                                    gridcolor: '#4a4a4a',
                                },
                            }}
                            useResizeHandler={true}
                            style={{width: "100%", height: "70vh"}}
                        />
                    </div>
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