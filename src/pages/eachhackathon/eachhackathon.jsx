import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { AiFillStar, AiOutlineStar, AiTwotoneCalendar } from "react-icons/ai";

import "./index.css";

const Eachhackathon = () => {
    const { id } = useParams();
    const [data, setdata] = useState(JSON.parse(localStorage.getItem(id)));

    const strdate1 = data.startdate;
    const strdate2 = data.enddate;

    const date1 = new Date(
        strdate1.substring(5, 7) +
            "/" +
            strdate1.substring(8, 10) +
            "/" +
            strdate1.substring(0, 4)
    );

    const date2 = new Date(
        strdate2.substring(5, 7) +
            "/" +
            strdate2.substring(8, 10) +
            "/" +
            strdate2.substring(0, 4)
    );

    /**favourites */
    function changefav(e) {
        const fav = data.isfav ^ 1;
        localStorage.setItem(id, JSON.stringify({ ...data, isfav: fav }));
        setdata(JSON.parse(localStorage.getItem(id)));
    }

    /**Modal handle */
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handledelete(e) {
        localStorage.removeItem(id);
        navigate("/");
    }

    return (
        <div>
            <Container className="app-new-sub-container" fluid={true}>
                <Row>
                    <Col xs={2}>
                        <img src={data.image} alt="" className="image" />
                    </Col>
                    <Col xs={8}>hello</Col>
                    <Col>
                        <Link to={`/edit/${id}`}>
                            <Button>Edit</Button>
                        </Link>
                        <br />
                        <br />
                        <Button onClick={handleShow}>Delete</Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>{data.summary}</Col>
                </Row>
                <br />
                <div className="container-last">
                    <div onClick={changefav} style={{ cursor: "pointer" }}>
                        {!data.isfav ? <AiOutlineStar /> : <AiFillStar />}
                    </div>
                    &nbsp; | &nbsp;
                    <div className="date">
                        <AiTwotoneCalendar />
                        &nbsp;&nbsp;
                        {date1.getDate()}
                        {date1.toLocaleString("default", { month: "long" })}
                    </div>
                </div>
            </Container>
            <br />
            <br />
            <Container>
                <Row>
                    <Col sm={8}>
                        <h4>Description</h4>
                        <br />
                        <p>{data.description}</p>
                    </Col>
                    <Col>
                        <h5>Hackathon</h5>
                        <h4>{data.hackathonName}</h4>
                        <div className="date">
                            <AiTwotoneCalendar />
                            &nbsp;
                            {date1.getDate()}
                            &nbsp;
                            {date1.toLocaleString("default", { month: "long" })}
                            &nbsp; - &nbsp; {date2.getDate()}
                            &nbsp;
                            {date2.toLocaleString("default", { month: "long" })}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* This is the modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Model</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This action is irreversible . Are you sure you want to
                    delete this model
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handledelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Eachhackathon;
