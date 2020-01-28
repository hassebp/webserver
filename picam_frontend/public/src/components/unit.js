//import modules
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router'
import { setConfig } from '../actions';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

const Unit = (props) => {
    const dispatch = useDispatch();

    const [fps, setfps] = useState();
    const [slowdown, setslowdown] = useState();
    const [length, setlength] = useState();
    const [name, setname] = useState();
    const [includedforrecording, setincludedforrecording] = useState();
    const [shot, setshot] = useState();

    const config = useSelector(state => state.mainReducer.config)

    const handleChangefps = event => {
        setfps(!fps)
    }
    const handleChangeslow = event => {
        setslowdown(event.target.value)
    }
    const handleChangelength = event => {
        setlength(event.target.value)
    }
    const handleChangename = event => {
        setname(event.target.value)
    }
    const handleChangerecord = event => {
        setincludedforrecording(includedforrecording)
    }
    const handleChangeshot = event => {
        setshot(!shot)
    }

    const onDelete = event => {

        return new Promise((resolve, reject) => {
            dispatch({
                type: "DEL_PI",
                payload: {
                    ip: props.data.ip
                }
            })

            resolve();
        }).then(() => {
            dispatch(setConfig(config));
            document.location.reload();
        });
    }

    useEffect(() => {
        setfps(props.data.fps);
        setslowdown(props.data.slowdown);
        setlength(props.data.length);
        setname(props.data.name);
        setincludedforrecording(props.data.includedforrecording);
        setshot(props.data.shot);

        console.log(props.data)
    }, []);


    useEffect(() => {

        if (fps && length && name) {
            dispatch({
                type: "SET_CONFIG",
                payload: {
                    ip: props.data.ip,
                    fps: Number(fps),
                    slowdown: Number(slowdown),
                    length: Number(length),
                    name: name,
                    includedforrecording: includedforrecording,
                    shot: shot
                }
            })
        }
    }, [fps, slowdown, length, name, includedforrecording, shot]);



    return (
        <div class="d-flex flex-column">

            <label>Name</label>
            <div class="d-flex">

                <div class="input-group mb-3">

                    <input type="text" class="form-control" aria-label="salam" value={name} name="name" style={{ "max-width": "300px" }} onChange={(e) => { setname(e.target.value) }} />

                    <Form.Group className="mt-2 ml-3">
                        <Form.Check type="checkbox" label="Use shots as names instead" onChange={(e) => { setshot(!shot) }} checked={shot} />
                    </Form.Group>

                </div>
            </div>

            <div class="d-flex">
                <div class="mr-3">
                    <Form.Group>
                        <Form.Label>Set FPS</Form.Label>
                        <Form.Control as="select" name="fps" onChange={(e) => { setfps(e.target.value) }} value={fps}>
                            <option>660</option>
                            <option>90</option>
                        </Form.Control>
                    </Form.Group>
                </div>


                <div class="mr-3">
                    <label for="basic-url">Set time of recording in ms</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control"
                            aria-label="Dollar amount (with dot and two decimal places)" value={length} onChange={handleChangelength} name="length" />
                        <div class="input-group-append">
                            <span class="input-group-text">ms</span>
                        </div>
                    </div>
                </div>

                <div class="mr-3">
                    <label for="basic-url">Set slowdown time</label>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control"
                            aria-label="Dollar amount (with dot and two decimal places)" value={slowdown} onChange={handleChangeslow} name="slowdown" />
                        <div class="input-group-append">
                            <span class="input-group-text">x</span>
                        </div>
                    </div>
                </div>
            </div>
            <p>IP address: {props.data.ip}</p>
            <div class="d-flex form-check justify-content-between" style={{ "width": "80%" }}>

                <Form.Group className="mt-2 ml-3">
                    <Form.Check type="checkbox" label="Include for recordings" onChange={(e) => { setincludedforrecording(!includedforrecording) }} name="includedforrecording" checked={includedforrecording} />
                </Form.Group>

                <div>
                    <Button variant="danger btn-sm" onClick={onDelete}>Delete unit</Button>
                </div>
            </div>

        </div >
    );
}

export default withRouter(Unit);
