import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import NewExercise from "../pages/NewExercise";
import List from "../pages/exercise/List";
import Update from "../pages/exercise/Update";
import Show from "../pages/exercise/Show";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new_exercise">
            <NewExercise user={user} />
          </Route>
          <Route path="/exercises/:exercise_id/update_log/:id">
            <Update/>
          </Route>
          <Route path="/exercises/:id">
            <Show/>
          </Route>
          <Route path="/exercises">
            <List />
          </Route>
          <Route path="/">
            <List user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
