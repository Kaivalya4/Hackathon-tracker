import Container from "react-bootstrap/esm/Container";
import Onerow from "./Onerow";

import getdate from "../utils/getdate";

const Projects = ({ filter }) => {
    let values = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
        if (keys[i] === "ally-supports-cache") continue;
        let temp = localStorage.getItem(keys[i]);
        temp = JSON.parse(temp);
        values.push({ ...temp, id: keys[i] });
    }

    function applyfilter(values, filter) {
        const temp = values.filter((value) => {
            return (
                (value.isfav === filter.toshow || filter.toshow === 0) &&
                value.title.toLowerCase().includes(filter.search)
            );
        });
        temp.sort((a, b) => {
            const atime = getdate(a.startdate).getTime();
            const btime = getdate(b.startdate).getTime();
            if (filter.sort) return atime - btime;
            return btime - atime;
        });

        return temp;
    }

    return (
        <Container>
            <br />
            <br />
            <Onerow values={applyfilter(values, filter)} />
        </Container>
    );
};

export default Projects;
