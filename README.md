# BlogApp

This is a Blog App I made with Express and ejs as a rendering engine.
I've used MongoDB. This is a app I made to Learn RESTFUL Routes.

## RESTFUL Routes:

| Name    | Path            | HTTP Verb |
| ------- | --------------- | --------- |
| Index   | /blogs          | GET       |
| New     | /blogs/new      | GET       |
| Create  | /blogs          | POST      |
| Show    | /blogs/:id      | GET       |
| Edit    | /blogs/:id/edit | GET       |
| Update  | /blogs/:id      | PUT       |
| Destroy | /blogs/:id      | DELETE    |

# Dependencies and Conventions

Since HTML only supports POST and GET methods I've used a npm library called `method-override` to perform PUT and DELETE request.

## TODOS.

- [x] Add, delete and Edit blogs,
- [ ] Add Authentication,
- [ ] Only Authenticated and selected user can Add, Edit and Update Blogs

### Installation

You need to have Node and npm installed to reun the project.

Clone this repo.

run `npm install`.

run `nodemon app`.

Enjoy the app.
