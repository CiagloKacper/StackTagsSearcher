import { Accordion, AccordionDetails, AccordionSummary, TextField } from "@mui/material";
import TableGenerator from "./TableGen";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Loading from "./LoadComp";
import { IconAdjustments, IconArrowBadgeDownFilled, IconBrandStackoverflow } from "@tabler/icons-react";


export default function Inputs(props) {

    const [queries, UpdateQueries] = useState({
        "sort": "popular",
        "order": "desc",
        "page": "1",
        "pagesize": "1"
    });
    const [loadStatus, setNewLoadStatus] = useState(false);
    const [tagsData, setTagsData] = useState([
        {}
    ])
    useEffect(() => {
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
        //clear timeout if status changed in 350ms
        return () => clearTimeout(updateDebounce);
    }, [newSearch])


    return (
        <Container className="mt-5">
            <div className="d-md-flex d-block">
                <div>
                    <h1 className="d-flex">
                        <IconBrandStackoverflow size={45} className="my-auto" />
                        Stackoverflow Tags Searcher
                    </h1>
                    <p style={{marginLeft:"48px"}}>Created by: Kacper Ciągło</p>
                </div>
                <div sx={{"width":"100%", mx:"auto"}} >
                    <Container className="d-flex justify-content-center mb-2">
                        <TextField id="Tag names"
                            onChange={(event) => {
                                setSearchValue(["inname", event.target.value])
                            }}
                            helperText=""
                            className="me-2" label="Tag name" variant="standard" />
                        <TextField id="pageLimit"
                            onChange={(event) => {
                                setSearchValue(["pagesize", event.target.value,])
                            }}
                            className="ms-2" type="number" label="Page search limit" variant="standard" />
                    </Container>
                    <Accordion className="mx-auto" style={{maxWidth:'500px'}}>
                        <AccordionSummary
                            expandIcon={<IconArrowBadgeDownFilled color="black"/>}
                            className="fw-bold"
                        >
                            <IconAdjustments /> Filters
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
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