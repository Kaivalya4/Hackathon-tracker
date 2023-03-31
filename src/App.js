import "./App.css";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { AiOutlineSearch } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
import Projects from "./components/Projects";
import { useState } from "react";

function App() {
    const [dropdown, setdropdown] = useState(0);
    const [option, setoption] = useState("Newest");

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
    function openDropdown() {
        setdropdown(dropdown ^ 1);
    }

    function selectcontent() {
        return dropdown ? "select__content-active" : "select__content";
    }

    function handlesort(name, value) {
        setoption(name);
        setfilter({ ...filter, sort: Number(value) });
        setdropdown(dropdown ^ 1);
    }

    return (
        <div className="bg">
            <Container className="app-new-sub-container" fluid={true}>
                <Row>
                    <Col xs={12} lg={8}>
                        <h1 className="new-sub-title">Hackathon Submissions</h1>
                        <br />
                        <p className="new-sub-descrip">
                            Lorem ipsum dolor sit amet consectetur. Urna cursus
                            amet pellentesque in parturient purus feugiat
                            faucibus. Congue laoreet duis porta turpis eget
                            suspendisse ac pharetra amet. Vel nisl tempus nec
                            vitae.
                        </p>
                        <br />
                        <Link to="newsub">
                            <button className="upload-btn">
                                Upload Submission
                            </button>
                        </Link>
                    </Col>
                    <Col className="light-bulb-col">
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
                    {/* <Form.Select
                        // aria-label="Default select example"
                        className="search__select"
                        onClick={handlesort}
                    >
                        <option value="0" className="options">
                            Newest
                        </option>
                        <option value="1" className="options">
                            Oldest
                        </option>
                    </Form.Select> */}
                    <div className="dropdown">
                        <div className="search__select" onClick={openDropdown}>
                            {option} <MdArrowDropDown />
                        </div>
                        <div className={selectcontent()}>
                            <div
                                className="options"
                                onClick={() => handlesort("Newest", 0)}
                            >
                                Newest
                            </div>
                            <div
                                className="options"
                                onClick={() => handlesort("Oldest", 1)}
                            >
                                Oldest
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Projects filter={filter} />
        </div>
    );
}

export default App;
