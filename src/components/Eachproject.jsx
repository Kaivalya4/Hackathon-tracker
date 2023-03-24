import React from "react";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Eachproject = ({ values }) => {
    const navigate = useNavigate();

    const date = new Date();
    const strdate = values.startdate;

    const date2 = new Date(
        strdate.substring(5, 7) +
            "/" +
            strdate.substring(8, 10) +
            "/" +
            strdate.substring(0, 4)
    );

    const datetoshow = Math.round(
        (date.getTime() - date2.getTime()) / (1000 * 3600 * 24)
    );

    function redirect(e) {
        navigate(`eachhack/${values.id}`);
    }

    return (
        <Col>
            <Card className="hackathon-card" onClick={redirect}>
                <div className="card-row-1">
                    <img src={values.image} alt="" className="card-image" />
                    <h4>{values.title}</h4>
                </div>
                <br />
                <p>{values.summary}</p>
                <div className="card-date">uploaded {datetoshow} ago</div>
            </Card>
            <br />
        </Col>
    );
};

export default Eachproject;
