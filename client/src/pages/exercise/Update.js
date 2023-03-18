import React, {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';

import {useHistory} from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {Button, Error, FormField, Input, Label, Textarea} from "../../styles";
import Show from "./Show";

function Update() {
    // const [exercise_id, setExerciseId] = useState(null)
    // const [repetitionCount, setRepetitionCount] = useState(null)
    // const [repetitionType, setRepetitionType] = useState(null)
    const [log, setLog] = useState(null)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const {exercise_id, id} = useParams()

    useEffect(() => {
        fetch(`/logs/${id}`)
            .then((r) => r.json())
            .then((r) => {
                setLog(r)
            });
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch(`/logs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exercise_id: exercise_id,
                repetition_type: log.repetition_type,
                repetition_count: log.repetition_count,
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                history.push(`/exercises/${exercise_id}`);
                <Show id={id}/>
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    const onChange = (field) => (event) => {

        setLog({[field]: event.target.value})
        return event
    }

    return (
        <Wrapper>
            <WrapperChild>
                <h2>Update Log</h2>
                {log ?
                    <>
                        <form onSubmit={handleSubmit}>
                            <FormField>
                                <Label htmlFor="exercise_id">Exercise ID</Label>
                                <Input
                                    type="number"
                                    id="exercise_id"
                                    value={log.exercise_id}
                                    onChange={onChange("exercise_id")}
                                />
                            </FormField>
                            <FormField>
                                <Label htmlFor="exercise_title">Exercise title</Label>
                                <Input
                                    type="text"
                                    id="exerciseTitle"
                                    value={log.title}
                                    disabled={true}
                                />
                            </FormField>
                            <FormField>
                                <Label htmlFor="exercise_description">Exercise description</Label>
                                <Textarea
                                    id="description"
                                    rows="5"
                                    value={log.description}
                                    disabled={true}
                                />
                            </FormField>
                            <FormField>
                                <Label htmlFor="repetitionCount">Repetition count</Label>
                                <Input
                                    type="number"
                                    id="repetitionCount"
                                    value={log.repetition_count}
                                    onChange={onChange("repetition_count")}
                                />
                            </FormField>
                            <FormField>
                                <Label htmlFor="repetitionType">Repetition type</Label>
                                <Input
                                    type="text"
                                    id="repetitionType"
                                    value={log.repetition_type}
                                    onChange={onChange("repetition_type")}
                                />
                            </FormField>
                            <FormField>
                                <Button color="primary" type="submit">
                                    {isLoading ? "Loading..." : "Update Log"}
                                </Button>
                            </FormField>
                            <FormField>
                                {errors.map((err) => (
                                    <Error key={err}>{err}</Error>
                                ))}
                            </FormField>
                        </form>
                        <Button as={Link} to={`/exercises/${id}`}>
                            Cancel
                        </Button>
                    </>
                    : null
                }
            </WrapperChild>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default Update;
