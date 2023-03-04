import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";
import NewExercise from "../pages/NewExercise";
import ExerciseList from "../pages/ExerciseList";
import NewLog from "../pages/NewLog";
import LogList from "../pages/LogList";
import axios from 'axios'

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // auto-login
    axios.get("/me").then((r) => {
      console.log(r.status)
      if (r.status === 200) {
        setUser(r.data)
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewRecipe user={user} />
          </Route>
          <Route path="/new_exercise">
            <NewExercise user={user} />
          </Route>
          <Route path="/exercises">
            <ExerciseList user={user} />
          </Route>
          <Route path="/new_logs">
            <NewLog user={user} />
          </Route>
          <Route path="/history">
            <LogList user={user} />
          </Route>
          <Route path="/">
            <RecipeList />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
