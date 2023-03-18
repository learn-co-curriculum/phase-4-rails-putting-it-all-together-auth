import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link, useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
import {Box, Button} from "../../styles";

function Logs({userLogs}) {
    const [logs, setLogs] = useState(userLogs);
    const history = useHistory()

    const deleteLog = (id, exercise_id) => {
        fetch(`/logs/${id}`, {method: "DELETE"})
            .then((r) => r.json())
            .then(setLogs);

        history.push(`/exercises/${exercise_id}`);
    }

    console.log("logs", logs)
    console.log("logs", userLogs)
    return (
        logs.map((log) => (
                <Box>
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
                    <Button as={Link} onClick={() => deleteLog(log.id, log.exercise_id)}>
                        Delete log
                    </Button>
                    <Button as={Link} to={`/exercises/${log.exercise_id}/update_log/${log.id}`}>
                        Update log
                    </Button>
                </Box>
            )
        )
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Exercise = styled.article`
  margin-bottom: 24px;
`;

export default Logs;
