import "./App.css";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { AiOutlineSearch } from "react-icons/ai";
import Projects from "./components/Projects";
import { useState } from "react";

function App() {
    const [filter, setfilter] = useState({
        toshow: 0,
        search: "",
        sort: 0,
    });

    /*all submission and fav submission */
    function allsub(e) {
        setfilter({ ...filter, toshow: 0 });
    }

    function allsubclass(e) {
        return "all" + (filter.toshow ? "" : " all-active");
    }

    function fav(e) {
        setfilter({ ...filter, toshow: 1 });
    }

    function favclass(e) {
        return "fav" + (!filter.toshow ? "" : " fav-active");
    }

    /*search */
    function handlesearch(e) {
        setfilter({ ...filter, search: e.target.value });
    }

    /*sorting */

    function handlesort(e) {
        setfilter({ ...filter, sort: Number(e.target.value) });
    }

    return (
        <div className="bg">
            <Container className="app-new-sub-container" fluid={true}>
                <Row>
                    <Col xs={12} lg={8}>
                        <h1 className="new-sub-title">Hackathon Submissions</h1>
                        <br />
                        <p className="new-sub-descrip">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dignissimos odit accusamus temporibus fuga!
                            Fugiat amet, error eum iusto est, ipsam velit nemo
                            iure eaque voluptatibus quidem, animi non ut aut
                            similique quia. Beatae facilis necessitatibus
                            voluptate aliquam officia illo sequi, animi et, a id
                            neque, harum ex sint eaque in.
                        </p>
                        <br />
                        <Link to="newsub">
                            <Button variant="success">New Submission</Button>
                        </Link>
                    </Col>
                    <Col>
                        <img
                            src={require("./assets/Hand holding bulb 3D.png")}
                            alt=""
                            className="light-bulb"
                        />
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
            <div className="filter">
                <div className="filter-first">
                    <div className={allsubclass()} onClick={allsub}>
                        All Submissions
                    </div>
                    <div className={favclass()} onClick={fav}>
                        Favourite Submissions
                    </div>
                </div>
                <div className="filter-second">
                    <form action="" className="search">
                        <AiOutlineSearch className="search__icon" />
                        <input
                            type="text"
                            name=""
                            id=""
                            className="search__input"
                            placeholder="Search"
                            onChange={handlesearch}
                        />
                    </form>
                    <Form.Select
                        aria-label="Default select example"
                        className="search__select"
                        onClick={handlesort}
                    >
                        <option value="0" className="options">
                            Newest
                        </option>
                        <option value="1" className="options">
                            Oldest
                        </option>
                    </Form.Select>
                </div>
            </div>
            <Projects filter={filter} />
        </div>
    );
}

export default App;
