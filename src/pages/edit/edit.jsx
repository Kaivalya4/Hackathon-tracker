import React, { useState } from "react";

import Container from "react-bootstrap/esm/Container";

import styles from "./index.module.css";

import Form from "react-bootstrap/Form";
import { RiImageAddLine } from "react-icons/ri";
import Button from "react-bootstrap/esm/Button";

import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const data = JSON.parse(localStorage.getItem(id));

    ///usestate and setstate both are async
    const [formdata, setformdata] = useState({
        ...data,
        isfav: data.isfav,
    });

    function onchange(e) {
        setformdata((previousvalue) => ({
            ...previousvalue,
            [e.target.name]: e.target.value,
        }));
    }

    function submit(e) {
        e.preventDefault();
        localStorage.setItem(id, JSON.stringify(formdata));
        navigate("/");
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
            }));
            console.debug("file stored", base64);
        });
    }

    return (
        <Container fluid={true} className={styles.edit_sub_cont}>
            <Form className={styles.form} onSubmit={submit}>
                <h3>Edit Submission</h3>
                <br />
                <Form.Group className={styles.form_group}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        placeholder="Title of your submission"
                        onChange={onchange}
                        required={true}
                        name="title"
                        defaultValue={data.title || ""}
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                        placeholder="A short summary of your submission (this will be visible with your submission)"
                        maxLength={150}
                        minLength={10}
                        onChange={onchange}
                        required={true}
                        name="summary"
                        defaultValue={data.summary || ""}
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        placeholder="Write a long description of your project. You can describe your idea and approach here."
                        as="textarea"
                        maxLength={3000}
                        minLength={10}
                        rows={3}
                        onChange={onchange}
                        required={true}
                        name="description"
                        defaultValue={data.description || ""}
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    Cover Image
                    <br />
                    <Form.Label
                        htmlFor="upload-image"
                        className={styles.upload_image_label}
                    >
                        <RiImageAddLine />
                    </Form.Label>
                    {
                        <Form.Control
                            type="file"
                            accept="image/*"
                            id="upload-image"
                            className={styles.upload_image}
                            onChange={imageupload}
                            name="image"
                        />
                    }
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label>Hackathon Name</Form.Label>
                    <Form.Control
                        placeholder="Enter the name of the hackathon"
                        onChange={onchange}
                        required={true}
                        name="hackathonName"
                        defaultValue={data.hackathonName || ""}
                    />
                </Form.Group>
                <div className={styles.form_date}>
                    <Form.Group className={styles.form_group}>
                        <Form.Label>Hackathon Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter the name of the hackathon"
                            onChange={onchange}
                            required={true}
                            name="startdate"
                            defaultValue={data.startdate || ""}
                        />
                    </Form.Group>
                    <Form.Group className={styles.form_group}>
                        <Form.Label>Hackathon Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Enter the name of the hackathon"
                            onChange={onchange}
                            required={true}
                            name="enddate"
                            defaultValue={data.enddate || ""}
                        />
                    </Form.Group>
                </div>
                <Form.Group className={styles.form_group}>
                    <Form.Label>Github Repository</Form.Label>
                    <Form.Control
                        placeholder="Enter your submission’s public GitHub repository link"
                        type="url"
                        onChange={onchange}
                        required={true}
                        name="repo"
                        defaultValue={data.repo || ""}
                    />
                </Form.Group>
                <Form.Group className={styles.form_group}>
                    <Form.Label>Other Links</Form.Label>
                    <Form.Control
                        placeholder="Enter your submission’s public GitHub repository link"
                        onChange={onchange}
                        required={true}
                        name="link"
                        defaultValue={data.link || ""}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Save Submission
                </Button>
            </Form>
        </Container>
    );
};

export default Edit;
