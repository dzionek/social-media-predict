import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import numbro from "numbro"
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
    insignificant?: boolean,
    username?: string,
    picture?: string,
    dates?: [string],
    subscribers?: [number],
    r?: number,
    predicted?: [string, string]
}

function Result(props: ResultProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(true)
    const [response, setResponse] = useState<Response>(null)

    const viewersName = props.state.platform === 'YouTube' ? 'subscribers' : 'followers'

    useEffect(() => {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
        axios.defaults.xsrfCookieName = "csrftoken"

        axios.post("/predict/", {
            username: props.state.username,
            platform: props.state.platform
        }).then((r: {data: Response}) => {
            setResponse(r.data)
            setIsLoading(false)
        })
    }, [])

    let content: JSX.Element

    if (isLoading) {
        content = <div>Loading...</div>
    } else {
        if (response.doesExist && !response.insignificant) {
            content =
                <div className="text-center">
                    <div className="row">
                        <div className="col-md-4"/>
                        <div className="col-md-4">
                            <div className="media">
                                <img src={response.picture} className="img-thumbnail mr-3 picture" alt="Profile picture"/>
                                <div className="media-body text-left">
                                    <h3 className="mt-0">{response.username}</h3>
                                    <h5>{props.state.platform}</h5>
                                    <div>
                                        Current {viewersName}:{'\u00A0'}
                                        {
                                            numbro(response.subscribers[response.subscribers.length - 1])
                                            .format({average: true, totalLength: 3})
                                        }
                                    </div>
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
                                    x: response.dates,
                                    y: response.subscribers,
                                    marker: {
                                        color: '#636EFA'
                                    },
                                    name: 'last month'
                                },
                                {
                                    x: response.predicted.map(item => item[0]),
                                    y: response.predicted.map(item => item[1]),
                                    name: 'predicted'
                                }
                                ]}
                            layout={{
                                autosize: true,
                                title: `Prediction of ${viewersName} for ${response.username} (R^2=${Math.pow(response.r, 2).toFixed(2)})`,
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                font: {
                                    color: 'white',
                                    size: 15
                                },
                                xaxis: {
                                    showgrid: false,
                                    type: 'date'
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


        } else if (response.insignificant) {
            content = <h1>The given user has too few {viewersName}.</h1>
        } else {
            content = <h1>The given user does not exist.</h1>
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