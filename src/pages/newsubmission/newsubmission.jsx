import React, { useState } from "react";

import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";

import styles from "./index.module.css";

import Form from "react-bootstrap/Form";
import { RiImageAddLine } from "react-icons/ri";
import Button from "react-bootstrap/esm/Button";
import { MdCloudUpload } from "react-icons/md";
import { AiTwotoneCalendar } from "react-icons/ai";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import getdate from "../../utils/getdate";

const Newsubmission = () => {
    const navigate = useNavigate();
    const [charcnt, setcharcnt] = useState(0);
    const [showcal1, setshowcal1] = useState(1);
    const [showcal2, setshowcal2] = useState(1);
    const [show, setShow] = useState(false);

    ///usestate and setstate both are async
    const [formdata, setformdata] = useState({
        title: "",
        summary: "",
        description: "",
        image: "",
        imageName: "",
        hackathonName: "",
        startdate: "",
        enddate: "",
        repo: "",
        link: "",
        isfav: 0,
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onchange(e) {
        setformdata((previousvalue) => ({
            ...previousvalue,
            [e.target.name]: e.target.value,
        }));
        if (e.target.name === "description") {
            setcharcnt(e.target.value.length);
        }
    }

    function submit(e) {
        e.preventDefault();
        let datadate = getdate(formdata.startdate).getTime();
        let currdate = new Date();
        if (datadate - currdate.getTime() > 0) {
            handleShow();
        } else {
            localStorage.setItem(uuidv4(), JSON.stringify(formdata));
            navigate("/");
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    function imageupload(e) {
        const file = e.target.files[0];
        getBase64(file).then((base64) => {
            setformdata((previousvalue) => ({
                ...previousvalue,
                [e.target.name]: base64,
                imageName: e.target.value.substring(
                    e.target.value.lastIndexOf("\\") + 1
                ),
            }));
            console.debug("file stored", base64);
        });
    }

    function ondateFocus1(e) {
        e.target.type = "date";
        setshowcal1(0);
    }

    function ondateBlur1(e) {
        e.target.type = "text";
        setshowcal1(1);
    }

    function ondateFocus2(e) {
        e.target.type = "date";
        setshowcal2(0);
    }

    function ondateBlur2(e) {
        e.target.type = "text";
        setshowcal2(1);
    }

    return (
        <Container fluid={true} className={styles.new_sub_cont}>
            <Form className={styles.form} onSubmit={submit}>
                <h3 className={styles.h3}>New Hackathon Submission</h3>
                <Form.Group className={styles.form_group}>
                    <Form.Label className={styles.label}>Title</Form.Label>
                    <Form.Control
                        placeholder="Title of your submission"
                        onChange={onchange}
                        required={true}
                        name="title"
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label className={styles.label}>Summary</Form.Label>
                    <Form.Control
                        placeholder="A short summary of your submission (this will be visible with your submission)"
                        maxLength={150}
                        minLength={10}
                        onChange={onchange}
                        required={true}
                        name="summary"
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label className={styles.label}>
                        Description
                    </Form.Label>
                    <Form.Control
                        placeholder="Write a long description of your project. You can describe your idea and approach here."
                        as="textarea"
                        maxLength={3000}
                        minLength={10}
                        rows={3}
                        onChange={onchange}
                        required={true}
                        name="description"
                        className={styles.descrip}
                    />
                    <div className={styles.descrip_limit}>
                        {charcnt}/3000 characters
                    </div>
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <span>Cover Image</span>
                    <br />
                    <span className={styles.image_reso}>
                        Minimum resolution : 360px &times; 360px
                    </span>
                    {formdata.image.toString().length ? (
                        <Form.Label
                            htmlFor="upload-image"
                            className={styles.uploaded_image_label}
                        >
                            <div>
                                <img
                                    src={formdata.image || ""}
                                    alt=""
                                    className={styles.uploaded_image}
                                />
                                &nbsp;
                                {formdata.imageName}
                            </div>
                            <div>
                                Reupload &nbsp;
                                <MdCloudUpload />
                            </div>
                        </Form.Label>
                    ) : (
                        <Form.Label
                            htmlFor="upload-image"
                            className={styles.upload_image_label}
                        >
                            <RiImageAddLine />
                        </Form.Label>
                    )}
                    <Form.Control
                        type="file"
                        accept="image/*"
                        id="upload-image"
                        className={styles.upload_image}
                        onChange={imageupload}
                        name="image"
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label className={styles.label}>
                        Hackathon Name
                    </Form.Label>
                    <Form.Control
                        placeholder="Enter the name of the hackathon"
                        onChange={onchange}
                        required={true}
                        name="hackathonName"
                    />
                </Form.Group>
                <div className={styles.form_date}>
                    <Form.Group className={styles.form_group}>
                        <Form.Label className={styles.label}>
                            Hackathon Start Date
                        </Form.Label>
                        <div className={styles.date_container}>
                            <Form.Control
                                type="text"
                                placeholder="Select start date"
                                onChange={onchange}
                                required={true}
                                name="startdate"
                                onFocus={ondateFocus1}
                                onBlur={ondateBlur1}
                                className={styles.date}
                            />
                            {showcal1 ? <AiTwotoneCalendar /> : ""}
                        </div>
                    </Form.Group>
                    <Form.Group className={styles.form_group}>
                        <Form.Label className={styles.label}>
                            Hackathon End Date
                        </Form.Label>
                        <div className={styles.date_container}>
                            <Form.Control
                                type="text"
                                placeholder="Select end date"
                                onChange={onchange}
                                required={true}
                                name="enddate"
                                onFocus={ondateFocus2}
                                onBlur={ondateBlur2}
                                className={styles.date}
                            />
                            {showcal2 ? <AiTwotoneCalendar /> : ""}
                        </div>
                    </Form.Group>
                </div>
                <Form.Group className={styles.form_group}>
                    <Form.Label className={styles.label}>
                        Github Repository
                    </Form.Label>
                    <Form.Control
                        placeholder="Enter your submission’s public GitHub repository link"
                        type="url"
                        onChange={onchange}
                        required={true}
                        name="repo"
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label className={styles.label}>
                        Other Links
                    </Form.Label>
                    <Form.Control
                        placeholder="Enter your submission’s public GitHub repository link"
                        onChange={onchange}
                        name="link"
                    />
                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    className={styles.submit}
                >
                    Upload Submission
                </Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Start Date can not be more than current date !!!!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Newsubmission;
