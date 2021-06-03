import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import RecipeList from "../pages/RecipeList";
import NewRecipe from "../pages/NewRecipe";

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

  if (user) {
    return (
      <>
        <NavBar user={user} setUser={setUser} />
        <main>
          <Switch>
            <Route path="/new">
              <NewRecipe />
            </Route>
            <Route path="/">
              <RecipeList />
            </Route>
          </Switch>
        </main>
      </>
    );
  } else {
    return <Login onLogin={setUser} />;
  }
}

export default App;
