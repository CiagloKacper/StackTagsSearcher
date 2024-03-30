import { Table } from "react-bootstrap";
import "../styles/loading.css";
import { Button, CircularProgress } from "@mui/material";
import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {

    return (
        <div className="loadBody">
            <CircularProgress size={64} className="loadSVG"/>
            <Table className="my-5 loadTable" striped responsive hover>
                <thead className="header">
                    <tr>
                        <th>Name</th>
                        <th>Related posts</th>
                        <th>Explore</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>JavaScript</td>
                        <td>2528427</td>
                        <td>
                            <Button>
                                <a href={`https://stackoverflow.com/questions/tagged/javascript`}>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>php</td>
                        <td>2528527</td>
                        <td>
                            <Button>
                                <a href={`https://stackoverflow.com/questions/tagged/php`}>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>c#</td>
                        <td>3451237</td>
                        <td>
                            <Button>
                                <a href={`https://stackoverflow.com/questions/tagged/c#`}>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>dotnet</td>
                        <td>98712422</td>
                        <td>
                            <Button>
                                <a href={`https://stackoverflow.com/questions/tagged/dotnet`}>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}