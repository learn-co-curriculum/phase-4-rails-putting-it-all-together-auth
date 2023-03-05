import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Box, Button} from "../styles";

function LogList() {
    const [logs, setLogs] = useState([]);
    const [read, setReadMore] = useState(false)

    useEffect(() => {
        fetch("/logs")
            .then((r) => r.json())
            .then(setLogs);
    }, []);

    const readMore = () => {
        return setReadMore(!read)
    }

    return (
        <>
            <Wrapper>
                <div style={{marginBottom: 24}}>
                    <Button as={Link} to="/new_logs">
                        Add new log
                    </Button>
                </div>

                {logs.length > 0 ? (
                    logs.map((log) => (
                        <Log key={log.id}>
                            <Box>
                                <h2>{log.title}</h2>
                                {read ? <ReactMarkdown>{log.description}</ReactMarkdown> : null}
                                <Button onClick={readMore}>
                                    {read ? "Hide the description" : "Show the description"}
                                </Button>
                                <p>
                                    Repetion count: {log.repetition_count}
                                </p>
                                <p>
                                    Repetion type: {log.repetition_type}
                                </p>
                                <p>
                                    Repetion count: {log.repetition_type}
                                </p>
                                <p>
                                    Was made at: {log.log_date}
                                </p>
                            </Box>
                        </Log>
                    ))
                ) : (
                    <h2>No Logs Found</h2>
                )}
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Log = styled.article`
  margin-bottom: 24px;
`;

export default LogList;
