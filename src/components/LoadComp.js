import { Table } from "react-bootstrap";
import "../styles/Loading.css";
import { Button, CircularProgress } from "@mui/material";

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
                            <Button variant="contained">
                                <a>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>php</td>
                        <td>2528527</td>
                        <td>
                            <Button variant="contained">
                                <a>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>c#</td>
                        <td>3451237</td>
                        <td>
                            <Button variant="contained">
                                <a href={`https://www.youtube.com/watch?v=dQw4w9WgXcQ`}>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>dotnet</td>
                        <td>98712422</td>
                        <td>
                            <Button variant="contained">
                                <a>LEARN MORE</a>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}