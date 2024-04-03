import { Table } from "react-bootstrap";
import "../styles/Loading.css";
import { Button, IconButton, Snackbar } from "@mui/material";
import { IconX, IconZoomExclamation} from "@tabler/icons-react";
import { useState } from "react";

export default function Error(props) {

    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <IconX fontSize="small" />
          </IconButton>
        </>
      );

    return (
        <div className="loadBody">
            <IconZoomExclamation size={64} className="loadSVG errorIcon" />

            <Snackbar
                open={open}
                autoHideDuration={8000}
                onClose={handleClose}
                message={props.errorMsg}
                action={action}
            />

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
                                <a>LEARN MORE</a>
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