import Row from "react-bootstrap/esm/Row";
import Eachproject from "./Eachproject";

const Onerow = ({ values }) => {
    return (
        <Row className="sub-row">
            {values.length === 0 ? "No Hackathon Found !!!!" : ""}
            {values.map((hackathon) => {
                return <Eachproject values={hackathon} key={hackathon.id} />;
            })}
        </Row>
    );
};

export default Onerow;
