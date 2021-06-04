# Putting it All Together: Auth

## Learning Goals

- Authenticate a user with a username and password
- Authorize logged in users for specific actions

## Introduction

This is the biggest lab yet for this phase, so make sure to set aside some time
for this one. It's set up with a few different checkpoints so that you can build
out the features incrementally. By the end of this lab, you'll have built out
full authentication and authorization flow using sessions and cookies in Rails,
so getting this lab under your belt will give you some good code to reference
when you're building your next project with auth. Let's get started!

## Setup

As with other labs in this section, there is some starter code in place for a
Rails API backend and a React frontend. To get set up, run:

```sh
bundle install
npm install --prefix client
```

You can work on this lab by running the tests with `learn test`. It will also be
helpful to see what's happening during the request/response cycle by running the
app in the browser. You can run the Rails server with:

```sh
rails s
```

And you can run React in another terminal with:

```sh
npm start --prefix client
```

## Instructions

For all the deliverables below, if you use any Rails generators to create models
or controllers, make sure to use the `--no-test-framework` flag to avoid
overwriting the existing tests.

### Models

Create a `User` model with the following attributes:

- `username` that is a `string` type
- `password_digest` that is a `string` type
- `image_url` that is a `string` type
- `bio` that is a `string` type

Your `User` model should also:

- incorporate the `has_secure_password` macro to enable password encryption with `bcrypt`
- validate the user's username to ensure that it is **present** and **unique**
  (no two users can have the same username)
- a user **has many** recipes

Next, create a `Recipe` model with the following attributes:

- a recipe **belongs to** a user
- `title` that is a `string` type
- `instructions` that is a `text` type
- `minutes_to_complete` that is a `integer` type

Add validations for the `Recipe` model:

- `title` must be present
- `instructions` must be present and at least 50 characters long

Run the migrations after creating your models.

Ensure that the tests for the models are passing before moving forward. To run the
tests for _only_ the model files, run:

```sh
rspec spec/models
```

### Sign Up Feature

After creating the models, the next step is building out a sign up feature.

Handle sign up by implementing a `POST /signup` route. It should:

- Be handled in the `UsersController` with a `create` action
- In the `create` action, if the user is valid:
  - Save a new user to the database with their username, encrypted password, image URL, and bio
  - Save the user's ID in the session hash
  - Return a JSON response with the user's ID, username, image URL, and bio; and a HTTP status code of 201 (Created)
- If the user is not valid:
  - Return a JSON response with the error message, and a HTTP status code of 422 (Unprocessable Entity)

### Auto-Login Feature

Users can log into our app! 🎉 But we want them to **stay** logged in when they
refresh the page, or navigate back to our site from somewhere else.

Handle auto-login by implementing a `GET /me` route. It should:

- Be handled in the `UsersController` with a `show` action
- In the `show` action, if the user is logged in (if their `user_id` is in the session hash):
  - Return a JSON response with the user's ID, username, image URL, and bio; and a HTTP status code of 201 (Created)
- If the user is **not** logged in when they make the request:
  - Return a JSON response with an error message, and a status of 401 (Unauthorized)

Make sure the signup and auto-login features work as intended before moving
forward. You can test the `UsersController` requests with RSpec:

```sh
rspec spec/requests/users_spec.rb
```

You should also be able to test this in the React application by signing up via
the sign up form to check the `POST /signup` route; and refreshing the page
after logging in, and seeing that you are still logged in to test the `GET /me`
route.

### Login Feature

Now that users can create accounts via the API, let's give them a way to log
back into an existing account.

Handle login by implementing a `POST /login` route. It should:

- Be handled in the `SessionsController` with a `create` action
- In the `create` action, if the user's username and password are authenticated:
  - Save the user's ID in the session hash
  - Return a JSON response with the user's ID, username, image URL, and bio
- If the user's username and password are not authenticated:
  - Return a JSON response with an error message, and a status of 401 (Unauthorized)

Make sure this route works as intended by running `learn test` before moving
forward. You should also be able to test this in the React application by
logging in via the login form.

### Logout Feature

Users can log into our app! 🎉 Now, let's give them a way to log out.

Handle logout by implementing a `DELETE /logout` route. It should:

- Be handled in the `SessionsController` with a `destroy` action
- In the `destroy` action, if the user is logged in (if their `user_id` is in the session hash):
  - Remove the user's ID from the session hash
  - Return an empty response with a HTTP status code of 204 (No Content)
- If the user is **not** logged in when they make the request:
  - Return a JSON response with an error message, and a status of 401 (Unauthorized)

Make sure the login and logout features work as intended before moving
forward. You can test the `SessionsController` requests with RSpec:

```sh
rspec spec/requests/sessions_spec.rb
```

You should also be able to test this in the React application by logging in to
check the `POST /login` route; and logging out with the logout button to test
the `DELETE /logout` route.

### Recipe List Feature

Users should only be able to view recipes on our site after logging in.

Handle recipe viewing by implementing a `GET /recipes` route. It should:

- Be handled in the `RecipesController` with a `index` action
- In the `index` action, if the user is logged in (if their `user_id` is in the session hash):
  - Return a JSON response with of an array of all recipes with their title,
    instructions, and minutes to complete data along with a nested user object;
    and a HTTP status code of 201 (Created)
- If the user is **not** logged in when they make the request:
  - Return a JSON response with an error message, and a status of 401 (Unauthorized)

### Recipe Creation Feature

Now that users can log in, let's allow them to create new recipes!

Handle recipe creation by implementing a `POST /recipes` route. It should:

- Be handled in the `RecipesController` with a `create` action
- In the `create` action, if the user is logged in (if their `user_id` is in the session hash):
  - Save a new recipe to the database if it is valid. The recipe should **belong
    to** the logged in user, and should have title, instructions, and minutes to
    complete data provided from the params hash
  - Return a JSON response with the title, instructions, and minutes to complete
    data along with a nested user object; and a HTTP status code of 201 (Created)
- If the user is **not** logged in when they make the request:
  - Return a JSON response with an error message, and a status of 401 (Unauthorized)
- If the recipe is **not valid**:
  - Return a JSON response with the error messages, and a HTTP status code of
    422 (Unprocessable Entity)

After finishing the `RecipeController` features, you're done! Make sure to check
your work. You should be able to run the full test suite now with `learn test`.

You should also be able to test this in the React application by creating a new
recipe with the recipe form, and viewing a list of recipes.
