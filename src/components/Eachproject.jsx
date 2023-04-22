import React from "react";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import getdate from "../utils/getdate";

const Eachproject = ({ values }) => {
    const navigate = useNavigate();

    const date = new Date();
    const date2 = getdate(values.startdate);

    const datetoshow = Math.floor(
        (date.getTime() - date2.getTime()) / (1000 * 3600 * 24)
    );

    function redirect(e) {
        navigate(`eachhack/${values.id}`);
    }

    return (
        <Col xs={12} sm={8} lg={4} className="sub-col">
            <Card className="hackathon-card" onClick={redirect}>
                <div className="card-row-1">
                    <img src={values.image} alt="" className="card-image" />
                    <h4>
                        {values.title.length > 25
                            ? values.title.toString().substring(0, 25) + "..."
                            : values.title}
                    </h4>
                </div>
                <br />
                <p className="card-summary">
                    {values.summary.substring(0, 120)}
                </p>
                <div className="card-date">uploaded {datetoshow} days ago</div>
            </Card>
            <br />
        </Col>
    );
};

export default Eachproject;
