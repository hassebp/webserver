import axios from "axios"

import configFile from "../config.json"

export const getVideos = (data) => async dispatch => {


    await axios.get(configFile.BACKEND_IP + "/api/videos", data).then(res => {
        dispatch({
            type: "SET_VIDEOS",
            payload: res.data
        })
    }).catch(err => {
        alert(err)
    });
}

export const setConfig = (data) => async dispatch => {

    console.log("posting with data")
    console.log(data)
    await axios.post(configFile.BACKEND_IP + "/api/config", data).then(res => {

    }).catch(err => {
        alert(err)
    });
}


export const getConfig = (data) => async dispatch => {

    console.log(data)

    let config = {}
    await axios.get(configFile.BACKEND_IP + "/api/config", data).then(res => {


        dispatch({
            type: "GET_CONFIG",
            payload: res.data
        })
    }).catch(err => {
        alert(err)
    });
}

