import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Box, Button} from "../../styles";

function List() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch("/exercises")
            .then((r) => r.json())
            .then(setExercises);
    }, []);

    return (
        <>
            <Wrapper>
                <div style={{marginBottom: 24}}>
                    <Button as={Link} to="/new_exercise">
                        Add new exercise
                    </Button>
                </div>

                {
                    exercises.map((exercise) => (
                        <Exercise key={exercise.id}>
                            <Box>
                                <h2>{<Link to = {`/exercises/${exercise.id}`}>{exercise.title}</Link>}</h2>
                                <ReactMarkdown>{exercise.description}</ReactMarkdown>
                            </Box>
                        </Exercise>
                    ))
                }
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Exercise = styled.article`
  margin-bottom: 24px;
`;

export default List;
