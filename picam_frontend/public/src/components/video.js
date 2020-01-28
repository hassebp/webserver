//import modules
import React, { } from 'react';
import { withRouter } from 'react-router'

import configFile from "../config.json"

const video = (props) => {

    let videoPath = configFile.BACKEND_IP + "/videos/" + props.data.filename
    return (
        <div class="card">
            <div class="embed-responsive embed-responsive-16by9">
                <video width="320" height="240" controls>
                    <source src={videoPath} type="video/mp4" />
                </video>
            </div>
            <div class="card-body">
                <h5 class="card-title">{props.data.name} {props.data.date} {props.data.time}: fps: {props.data.fps} length: {props.data.length} slowdown: {props.data.slowdown}  {props.data.shotnumber != 'undefined' ? "shotnumber: " + props.data.shotnumber : false}</h5>
                <a href="#" class="btn btn-info btn-sm">Analyse</a>
            </div>
        </div>

    );
}

export default withRouter(video);
