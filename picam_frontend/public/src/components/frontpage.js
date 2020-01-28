//import modules
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import Video from './video';
import { getVideos, getConfig, setConfig } from '../actions';
import Unit from './unit';
import { Modal, Button } from 'react-bootstrap';

const Frontpage = (props) => {
    const dispatch = useDispatch();
    const videos = useSelector(state => state.mainReducer.videos)
    const config = useSelector(state => state.mainReducer.config)


    const [show, setShow] = useState(false);
    const [newpiip, setnewpiip] = useState();
    const [newpiname, setnewpiname] = useState();


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getVideos())
        dispatch(getConfig())
    }, []);

    const saveConfig = event => {
        dispatch(setConfig(config))
    }

    const addPi = event => {

        return new Promise((resolve, reject) => {
            dispatch({
                type: "ADD_PI",
                payload: {
                    ip: newpiip,
                    name: newpiname
                }
            });
            resolve()
        }).then(() => {
            dispatch(setConfig(config))
            handleClose(false);
        })
    }


    return (
        <div>
            <div class="d-flex flex-column ws">

                <div class="d-flex container-fluid py-2 menu">
                    <h1 class="containercustom">PiCam</h1>
                </div>



                <div class="containercustom flex-column mt-4">
                    <div class="d-flex justify-content-between">
                        <h4>Settings:</h4>
                        <div><Button variant="info" onClick={handleShow}>Add/remove unit</Button></div>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Units</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <div>
                                <label>Name:</label>
                                <input class="form-control" name="newpiname" onChange={e => setnewpiname(e.target.value)} value={newpiname} />
                                <label class="mt-2">IP:</label>
                                <input class="form-control" name="newpiip" onChange={e => setnewpiip(e.target.value)} value={newpiip} />

                            </div>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="success" onClick={addPi}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div class="d-flex row row-cols-2 mt-4">


                        {config.map(element => (
                            <Unit data={element}></Unit>
                        ))}



                    </div>

                    <div class="d-flex justify-content-end">
                        <Button variant="success" onClick={saveConfig}>Save changes</Button>
                    </div>

                </div>

                <div class="containercustom">
                    <h3>Videos</h3>
                    <div class="d-flex row row-cols-3">

                        {videos.map(element => (
                            <Video data={element} />
                        ))}

                    </div>
                </div>
            </div>
        </div>

    );
}

export default withRouter(Frontpage);
