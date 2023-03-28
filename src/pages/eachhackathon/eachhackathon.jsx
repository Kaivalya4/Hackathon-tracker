import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
    AiFillGithub,
    AiFillStar,
    AiOutlineStar,
    AiTwotoneCalendar,
} from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";

import getdate from "../../utils/getdate";

import styles from "./index.module.css";

const Eachhackathon = () => {
    const { id } = useParams();
    const [data, setdata] = useState(JSON.parse(localStorage.getItem(id)));

    const date1 = getdate(data.startdate);
    const date2 = getdate(data.enddate);

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

    /*edit redirect */
    function handleedit(e) {
        navigate(`/edit/${id}`);
    }

    return (
        <div>
            <Container className={styles.app_new_sub_container} fluid={true}>
                <Row className={styles.app_new_sub_container_row1}>
                    <Col sm={4} lg={2}>
                        <img src={data.image} alt="" className={styles.image} />
                    </Col>
                    <Col sm={6} lg={8}>
                        <h1>{data.title}</h1>
                    </Col>
                    <Col sm={2}>
                        <Button
                            variant="Light"
                            onClick={handleedit}
                            className={styles.cust_button}
                        >
                            <MdEdit />
                            Edit
                        </Button>
                        <br />
                        <br />
                        <Button
                            onClick={handleShow}
                            variant="Light"
                            className={styles.cust_button}
                        >
                            <MdDelete />
                            Delete
                        </Button>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>{data.summary}</Col>
                </Row>
                <br />
                <div className={styles.container_last}>
                    <div onClick={changefav} style={{ cursor: "pointer" }}>
                        {!data.isfav ? <AiOutlineStar /> : <AiFillStar />}
                    </div>
                    &nbsp; | &nbsp;
                    <div className={styles.date}>
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
                        <p className={styles.descrip_para}>
                            {data.description}
                        </p>
                    </Col>
                    <Col>
                        <h5 className={styles.hackathon_title}>Hackathon</h5>
                        <h4>{data.hackathonName}</h4>
                        <div className={styles.hackathon_date}>
                            <AiTwotoneCalendar />
                            &nbsp;
                            {date1.getDate()}
                            &nbsp;
                            {date1.toLocaleString("default", { month: "long" })}
                            &nbsp; - &nbsp; {date2.getDate()}
                            &nbsp;
                            {date2.toLocaleString("default", { month: "long" })}
                        </div>
                        <br />
                        <br />
                        <Link
                            to={data.repo}
                            target="_blank"
                            className={styles.link}
                        >
                            <div className={styles.hackathon_repo}>
                                <AiFillGithub />
                                &nbsp; Github Repository
                            </div>
                        </Link>
                        <br />
                        {data.link.toString().length ? (
                            <Link
                                to={data.link}
                                target="_blank"
                                className={styles.link}
                            >
                                <div className={styles.hackathon_repo}>
                                    <TbExternalLink />
                                    Other Link
                                </div>
                            </Link>
                        ) : (
                            ""
                        )}
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
