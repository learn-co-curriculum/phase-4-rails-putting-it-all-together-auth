import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Link, useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
import {Box, Button, Error, FormField, Input, Label} from "../../styles";
import Logs from "./Logs";

function Show() {
    const [exercise, setExercise] = useState(null);
    const [isNew, setNew] = useState(false);
    const [repetitionCount, setRepetitionCount] = useState(null)
    const [repetitionType, setRepetitionType] = useState(null)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory()
    const {id} = useParams()

    useEffect(() => {
        fetch(`/exercises/${id}`)
            .then((r) => r.json())
            .then(setExercise);
    }, [isNew]);


    console.log("exercise", exercise)

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exercise_id: id,
                repetition_type: repetitionType,
                repetition_count: repetitionCount,
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                history.push(`/exercises/${id}`);
                setNew(!isNew)
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    const addNew = () => {
        return setNew(!isNew)
    }

    return (
        isNew ?
            <Wrapper>
                <WrapperChild>
                    <h2>Create Log</h2>
                    <form onSubmit={handleSubmit}>
                        <FormField>
                            <Label htmlFor="exerciseID">Exercise ID</Label>
                            <Input
                                type="number"
                                id="exerciseID"
                                value={id}
                                disabled={true}
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="repetitionCount">Repetition count</Label>
                            <Input
                                type="number"
                                id="repetitionCount"
                                value={repetitionCount}
                                onChange={(e) => setRepetitionCount(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Label htmlFor="repetitionType">Repetition type</Label>
                            <Input
                                type="text"
                                id="repetitionType"
                                value={repetitionType}
                                onChange={(e) => setRepetitionType(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Button color="primary" type="submit">
                                {isLoading ? "Loading..." : "Submit Log"}
                            </Button>
                        </FormField>
                        <FormField>
                            {errors.map((err) => (
                                <Error key={err}>{err}</Error>
                            ))}
                        </FormField>
                    </form>
                    <div style={{marginBottom: 24}}>
                        <Button onClick={addNew}>
                            Cancel
                        </Button>
                    </div>
                </WrapperChild>
            </Wrapper>
            :

            exercise ?
                <>
                    <Wrapper>
                        {
                            <>
                                <div style={{marginBottom: 24}}>
                                    <Button onClick={addNew}>
                                        Add new log
                                    </Button>
                                </div>

                                <h2>{exercise.title}</h2>
                                <ReactMarkdown>{exercise.description}</ReactMarkdown>
                                <Logs userLogs={exercise.logs}></Logs>
                            </>
                        }
                    </Wrapper>
                </>
                :
                <></>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default Show;
