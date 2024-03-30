import { TextField } from "@mui/material";
import TableGenerator from "./TableGen";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./LoadComp";


export default function Inputs(props) {

    const [queries, UpdateQueries] = useState({
        "sort": "popular",
        "pagesize": "1"
    });
    const [loadStatus, setNewLoadStatus] = useState(false);
    const [tagsData, setTagsData] = useState([
        {}
    ])
    useEffect(() => {
        console.log(queries)
        setNewLoadStatus(false);
        setTimeout(() => {
            setNewLoadStatus(true);
            setTagsData([
                {
                    "name": "Loading...",
                    "count": "10002"
                }
            ])
        }, 1500)
        // axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow${CreateSearchUrl(queries)}`)
        //     .then(response => {
        //         setNewLoadStatus(true);
        //         setTagsData(response.data.items)
        //     });
    }, [queries])

    const [newSearch, setSearchValue] = useState(["order", "desc"])
    useEffect(() => {
        //function fire it  when the value of inputs change
        const updateDebounce = setTimeout(() => {

            if (Object.entries(queries).some(([k]) => k == newSearch[0]))
                UpdateQueries(prevQueries => {
                    const updatedQueries = { ...prevQueries };
                    updatedQueries[newSearch[0]] = newSearch[1];
                    return updatedQueries;
                });
            else
                UpdateQueries(prevQueries => {
                    return {
                        ...prevQueries,
                        [newSearch[0]]: newSearch[1]
                    };
                })
        }, 650);
        //clear timeout if status changed
        return () => clearTimeout(updateDebounce);
    }, [newSearch])


    return (
        <Container>
            <Container className="d-flex">
                <TextField id="Tag names"
                    onChange={(event) => {
                        setSearchValue(["inname", event.target.value])
                    }}
                    className="mx-2" label="Tag name" variant="standard" />
                <TextField id="pageLimit"
                    onChange={(event) => {
                        setSearchValue(["pagesize", event.target.value,])
                    }}
                    className="mx-2" type="number" label="Page search limit" variant="standard" />
            </Container>

            {
                loadStatus ?
                    <TableGenerator tags={tagsData} />
                    :
                    <Loading />
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