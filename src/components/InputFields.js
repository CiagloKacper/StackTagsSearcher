import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select, TextField } from "@mui/material";
import TableGenerator from "./TableGen";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Loading from "./LoadComp";
import { IconAdjustments, IconArrowBadgeDownFilled, IconBrandStackoverflow } from "@tabler/icons-react";

import "../styles/Filter.css";
import axios from "axios";
import Error from "./Error";

export default function Inputs() {
    //pagination state
    const [page, setPage] = useState(1);
    //default call to get the first page of data
    const [queries, UpdateQueries] = useState({
        "sort": "popular",
        "order": "desc",
        "page": "1",
        "pagesize": "2"
    });

    //error & load status
    const [loadStatus, setNewLoadStatus] = useState(false);
    const [errorObj, setError] = useState("");

    const [tagsData, setTagsData] = useState([
        {}
    ])
    //Filters change
    const HandleOrderChange = (event) => {
        updateQueriesStatus("order", event.target.value);
    }
    const HandleSortChange = (event) => {
        updateQueriesStatus("sort", event.target.value);
    }

    const ApiCall = () => {
        //clear status before api call
        setNewLoadStatus(false);
        setError("");

        axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow${CreateSearchUrl(queries)}`)
            .then(response => {
                //200 OK
                setNewLoadStatus(true);
                setTagsData(response.data.items)
            }).catch((error) => {
                //catch and display error
                setNewLoadStatus(true)
                setError(`${error.response.data.error_message} : ${error.response.data.error_name}`);
            });
    }

    //new page status 
    const newPage = (event) => {
        if (event != "next" ) {
            if (page != 1) {

                setPage(page - 1);
                updateQueriesStatus("page", page);
            }
        }
        else {
            setPage(page + 1);
            updateQueriesStatus("page", page);
        }
        //refresh search
        ApiCall();
    }
    //update queries by key
    const updateQueriesStatus = (key, val) => {
        UpdateQueries((prevState) => {
            const updatedQueries = { ...prevState };
            updatedQueries[key] = val;
            return updatedQueries;
        })
    }

    const [newSearch, setSearchValue] = useState(["order", "desc"])
    useEffect(() => {
        //function fire it when the value of inputs change
        const updateDebounce = setTimeout(() => {

            if (Object.entries(queries).some(([k]) => k == newSearch[0]) && newSearch[1] != '')
                UpdateQueries(prevQueries => {
                    const updatedQueries = { ...prevQueries };
                    updatedQueries[newSearch[0]] = newSearch[1];
                    return updatedQueries;
                });
            else if (newSearch[1] != '')
                UpdateQueries(prevQueries => {
                    return {
                        ...prevQueries,
                        [newSearch[0]]: newSearch[1]
                    };
                })
        }, 350);
        //clear timeout if status changed in less than 350ms
        return () => clearTimeout(updateDebounce);
    }, [newSearch])

    //call default search function to load data on component mounting
    useEffect(() => { ApiCall() }, []);



    return (
        <Container className="mt-5">
            <div className="d-md-flex d-block">
                <div className="me-2">
                    <h1 className="d-flex">
                        <IconBrandStackoverflow size={45} className="my-auto" />
                        Stackoverflow Tag Searcher
                    </h1>
                    <p style={{ marginLeft: "48px" }}>Created by: Kacper Ciągło</p>
                </div>
                <div className="filterBody" sx={{ "width": "100%", mx: "auto" }} >
                    <Container className="d-flex justify-content-center mb-3 mt-2">
                        <TextField id="Tag names"
                            onChange={(event) => {
                                setSearchValue(["inname", event.target.value])
                            }}
                            helperText=""
                            className="m-1" label="Tag name" variant="standard" />
                        <TextField id="pageLimit"
                            onChange={(event) => {
                                setSearchValue(["pagesize", event.target.value,])
                            }}
                            className="m-1" type="number" label="Page search limit" variant="standard" />
                        <div>
                            <Button onClick={ApiCall} variant="contained" className="mt-3 confirm">Search</Button>
                        </div>
                    </Container>
                    <Accordion className="mx-auto" style={{ maxWidth: '500px' }}>
                        <AccordionSummary
                            expandIcon={<IconArrowBadgeDownFilled color="black" />}
                            className="fw-bold"
                        >
                            <IconAdjustments /> Filters
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="m-0">Sort</p>
                            <Select
                                displayEmpty
                                id="sort-select"
                                className="w-75"
                                value={queries["sort"]}
                                onChange={HandleSortChange}
                            >
                                <MenuItem value={"popular"}>popular</MenuItem>
                                <MenuItem value={"activity"}>activity</MenuItem>
                                <MenuItem value={"name"}>name</MenuItem>

                            </Select>
                            <p className="helperText">&nbsp;option "popular" is the default setting</p>
                            <p className="m-0">Order</p>
                            <Select
                                displayEmpty
                                id="order-select"
                                className="w-75"
                                value={queries["order"]}
                                onChange={HandleOrderChange}
                            >
                                <MenuItem className="d-none" value={"descending"}>descending</MenuItem>
                                <MenuItem value={"desc"}>descending</MenuItem>
                                <MenuItem value={"asc"}>ascending</MenuItem>
                            </Select>
                            <p className="helperText">&nbsp;option "descending" is the default setting</p>
                            <div className="mt-3 d-flex">
                                <Button onClick={() =>
                                    UpdateQueries(prevQueries => {
                                        const updatedQueries = { ...prevQueries };
                                        updatedQueries["order"] = "desc";
                                        updatedQueries["sort"] = "popular";
                                        return updatedQueries;
                                    })
                                } variant="contained" color="error" className="error">Clear filters</Button>
                                <Button onClick={ApiCall} variant="contained" className="ms-auto confirm">Apply filters</Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

            </div>
            {
                // display data only when loaded
                loadStatus ?
                    // display when no error occur
                    (errorObj == "" ?

                        <>
                            <TableGenerator tags={tagsData} />
                            <div className="text-center">
                                <Button onClick={() => newPage("nextnt")}>prev</Button>
                                <span>&nbsp;Page: {page}&nbsp;</span>
                                <Button onClick={() => newPage("next")}>next</Button>
                            </div>
                        </>
                        :
                        <Error errorMsg={errorObj} />
                    )
                    :
                    <Loading />
            }

        </Container >
    )
}

//create url for api call based on queries OBJ
function CreateSearchUrl(searchCriteria) {
    let searchUrl = '';

    Object.entries(searchCriteria).map((t) => {
        searchUrl += `&${t[0] + "=" + t[1]}`
    })
    return searchUrl;
}