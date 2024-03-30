import { TextField } from "@mui/material";
import TableGenerator from "./TableGen";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./LoadComp";


export default function Inputs(props) {

    const [queries, UpdateQueries] = useState({
        "order": "desc",
        "sort": "popular",
        "pagesize": "1"
    });
    const [loadStatus, setNewLoadStatus] = useState(false);
    const [tagsData, setTagsData] = useState([
        {}
    ])
    useEffect(() => {
        setNewLoadStatus(false);
        axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow${CreateSearchUrl(queries)}`)
            .then(response => {
                setNewLoadStatus(true);
                setTagsData(response.data.items)
            });
    }, [queries])

    return (
        <Container>
            <Container className="d-flex">
                <TextField id="Tag names" label="Tag name" variant="standard" />
                <TextField id="pageLimit" label="Page search limit" variant="standard" />
            </Container>

            {
                loadStatus ?
                    <TableGenerator tags={tagsData} />
                    :
                    <Loading/>
            }
        </Container>
    )
}

function CreateSearchUrl(searchCriteria) {
    let searchUrl = '';

    Object.entries(searchCriteria).map((t) => {
        searchUrl += `&${t[0] + "=" + t[1]}`
    })
    return searchUrl;
}