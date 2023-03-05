import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import {Button, Error, FormField, Input, Label, Textarea} from "../styles";
import AsyncSelect from "react-select/async";
import Select from "react-select";

function NewLog({user}) {
    const [title, setTitle] = useState("My Awesome Exercise");
    const [description, setDescription] = useState("");
    const [exerciseId, setExerciseId] = useState(null)
    const [repetitionCount, setRepetitionCount] = useState(null)
    const [repetitionType, setRepetitionType] = useState(null)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const getExercises = () => {
        return fetch("/exercises", {method: "GET"})
            .then((data) => {
                // console.log("data", data)
                return null
                // data.map((exercise) => {
                //     return {
                //         value: exercise.id,
                //         label: exercise.title
                //     };
                // })
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exercise_id: exerciseId,
                repetition_type: repetitionType,
                repetition_count: repetitionCount,
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                history.push("/history");
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <Wrapper>
            <WrapperChild>
                <h2>Create Log</h2>
                <form onSubmit={handleSubmit}>
                    <FormField>
                        <Label htmlFor="exerciseID">Exercise ID</Label>
                        <Input
                            type="number"
                            id="exerciseID"
                            value={exerciseId}
                            onChange={(e) => setExerciseId(e.target.value)}
                        />
                    </FormField>
                    <Select/>
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
                            {isLoading ? "Loading..." : "Submit Exercise"}
                        </Button>
                    </FormField>
                    <FormField>
                        {errors.map((err) => (
                            <Error key={err}>{err}</Error>
                        ))}
                    </FormField>
                </form>
            </WrapperChild>
            {/*<WrapperChild>*/}
            {/*    <h1>{title}</h1>*/}
            {/*    <ReactMarkdown>{description}</ReactMarkdown>*/}
            {/*</WrapperChild>*/}
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

export default NewLog;
