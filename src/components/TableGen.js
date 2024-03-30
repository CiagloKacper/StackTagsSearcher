import { Table } from "react-bootstrap";
import "../styles/Table.css";
import { Button } from "@mui/material";

export default function TableGenerator(props) {

    return (
        <Table className="my-5 tableBody" striped responsive hover>
            <thead>
                <tr className="header">
                    <th>Name</th>
                    <th>Related posts</th>
                    <th>Explore</th>
                </tr>
            </thead>
            <tbody>
                {props.tags.map(item => {
                    return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td><Button variant="contained"><a href={`https://stackoverflow.com/questions/tagged/${item.name}`}>LEARN MORE</a></Button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}