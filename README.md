# Blog_API
This is an API for a blogging website/app

You are required to build a blogging api. The general idea here is that the api has a general endpoint that shows a list of articles that have been created by different people, and anybody
that calls this endpoint, should be able to read a blog created
by them or other users.

Requirements:
---
1. Users should have a first_name, last_name, email, password, (you can add other attributes you want to store about the user)
2. A user should be able to sign up and sign in into the blog app
3. Use JWT as authentication strategy and expire the token after 1 hour
4. A blog can be in two states; draft and published
5. Logged in and not logged in users should be able to get a list of published blogs created
6. Logged in and not logged in users should be able to get a published blog
7. Logged in users should be able to create a blog.
8. When a blog is created, it is in draft state
9. The owner of the blog should be able to update the state of the blog to published
10. The owner of a blog should be able to edit the blog in draft or published state
11. The owner of the blog should be able to delete the blog in draft or published state

12. The owner of the blog should be able to get a list of their blogs.
- The endpoint should be paginated
- It should be filterable by state
13. Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
14. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated,
- default it to 20 blogs per page.

- It should also be searchable by author, title and tags.
- It should also be orderable by read_count, reading_time and timestamp
15. When a single blog is requested, the api should return the user information with the blog. The read_count of the blog too should be updated by 1
16. Come up with any algorithm for calculating the reading_time of the blog.

Note:
The owner of the blog should be logged in to perform actions.

## Using the MVC pattern

Database
---
- MongoDB

Host URL's
---
- [GitHub Link](https://github.com/Peter-TMK/***)
- [Heroku Link](https://***)

Data Models
---
___
### User
<!-- - email is required and should be unique
- first_name and last_name is required
- password -->

| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required and unique|
|  firstname | string  |  required |
|  lastname  |  string |  required  |
|  username |  string |  required and unique |
|  email     | string  |  required and unique|
|  password |   string |  required  |
| createdAt |  date |  required |
| updatedAt |  date |  required |

### Blog/Article
<!-- - title is required and unique
- description
- author
- state
- read_count
- reading_time
- tags
- body is required
- timestamp -->
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required and unique|
|  title |  string |  required and unique|
|  description |  string |  |
|  tags |  Array |  |
|  author === users' ID |  string | required |
|  state | number  |  required, enum: ['draft', 'published'], default: 'draft' |
| read_count | Number | required |
|  reading_time | array  |  required |
|  body |   String |  required  |
| createdAt |  date |  required |
| updatedAt |  date |  required |

## APIs
---
Users
___

### Signup User

- Route: http://localhost:PORT/api/auth/register
- Method: POST
- Body: 
```
{
  "firstname": "user",
  "lastname": "1",
  "username": "user1",
  "email": "user1@mail.com",
  "password": "Password0!",
}
```
- Responses

Success
```
{
  "message": "Registered Successfully!",
  "user": {
    "firstname": "user",
    "lastname": "1",
    "username": "user1",
    "email": "user1@mail.com",
    "password": "U2FsdGVkX1+P9EnH/RQpkPvziaYEY53BsD1V+J26t6I=",
    "_id": "6365edb2e4364c1971dc72b3",
    "createdAt": "2022-11-05T04:59:30.357Z",
    "updatedAt": "2022-11-05T04:59:30.357Z",
    "__v": 0
  }
}
```
---
### Login User

- Route: http://localhost:PORT/api/auth/login
- Method: POST
- Body: 
```
{
  "username": 'user1",
  "password": "Password0!"
}
```

- Responses

Success
```
{
  "message": "Login Successful!",
  "_id": "6365edb2e4364c1971dc72b3",
  "firstname": "user",
  "lastname": "1",
  "username": "user1",
  "email": "user1@mail.com",
  "createdAt": "2022-11-05T04:59:30.357Z",
  "updatedAt": "2022-11-05T04:59:30.357Z",
  "__v": 0,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjVlZGIyZTQzNjRjMTk3MWRjNzJiMyIsImlhdCI6MTY2NzYyNDYwMywiZXhwIjoxNjY3NjI4MjAzfQ.gzUP5BCFQT9Rb8gGPdixJeHxt7OYGyJ3fa6BARPmlUw"
}
```
---
### Get All Users

- Route: http://localhost:PORT/api/users/
- Method: GET
- Body: 
```
No Body
```

- Responses

Success
```
{
  "message": "All Users retrieved Successfully!",
  "users": [
    {
      "_id": "636617c56566fee9431f188a",
      "firstname": "user",
      "lastname": "1",
      "username": "user1",
      "email": "user1@mail.com",
      "password": "U2FsdGVkX1/2vUXPV3LNihMltDxQ/vD9IbcLGS9HHOg=",
      "createdAt": "2022-11-05T07:59:01.196Z",
      "updatedAt": "2022-11-05T07:59:01.196Z",
      "__v": 0
    },
    {
      "_id": "6366199b6566fee9431f1893",
      "firstname": "user",
      "lastname": "2",
      "username": "user2",
      "email": "user2@mail.com",
      "password": "U2FsdGVkX19V6tkpkK1U1YKIc3mqa61E9XbY7GmTVUc=",
      "createdAt": "2022-11-05T08:06:51.801Z",
      "updatedAt": "2022-11-05T08:06:51.801Z",
      "__v": 0
    }
  ]
}
```
---
### Update User

- Route: http://localhost:PORT/api/users/:id
- Method: PUT
- Body: 
```
{
  "firstname": "user updated!"
}
```

- Responses

Success
```
{
  "message": "User has been updated!",
  "updatedUser": {
    "_id": "6365edb2e4364c1971dc72b3",
    "firstname": "user updated!",
    "lastname": "1",
    "username": "user1",
    "email": "user1@mail.com",
    "password": "U2FsdGVkX1+P9EnH/RQpkPvziaYEY53BsD1V+J26t6I=",
    "createdAt": "2022-11-05T04:59:30.357Z",
    "updatedAt": "2022-11-05T07:39:53.615Z",
    "__v": 0
  }
}
```
---
### Delete User and All User's Post

- Route: http://localhost:PORT/api/users/:id
- Method: DELETE
- Body: 
```
No Body
```

- Responses

Success
```
"User and Post(s) have been deleted!"
```
---
Posts
___
### Create Post

- Route: /
- Method: POST
- Header
    - Authorization: Bearer {accessToken}
- Body: 
```
{
    "title": "qui est esse",
    "author": "6365edb2e4364c1971dc72b3",
    "tags": ["Anker2", "Soundcore2"],
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil ..."
  }
```

- Responses

Success
```
{
  "message": "Blog created Successfully!",
  "newPost": {
    "title": "qui est esse",
    "tags": [
      "Anker2",
      "Soundcore2"
    ],
    "state": "draft",
    "read_count": 0,
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil ...",
    "author": "6365edb2e4364c1971dc72b3",
    "_id": "63660a7bba6ddcd3e3adbc6f",
    "reading_time": 1,
    "createdAt": "2022-11-05T07:02:19.329Z",
    "updatedAt": "2022-11-05T07:02:19.329Z",
    "__v": 0
  }
}
```
---
### Get Post by ID

- Route: http://localhost:PORT/api/posts/:id
- Method: GET
- Header
    - Authorization: Bearer {accessToken}
- Responses

Success
```
{
  "_id": "6366188c6566fee9431f188f",
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "tags": [
    "Anker1",
    "Soundcore2"
  ],
  "state": "draft",
  "read_count": 2,
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita...",
  "author": null,
  "reading_time": 1,
  "createdAt": "2022-11-05T08:02:20.511Z",
  "updatedAt": "2022-11-05T08:22:00.479Z",
  "__v": 0
}
```
---
### Get Post of same User, by ID and return user info

- Route: http://localhost:PORT/api/posts/:id
- Method: GET
- Header
    - Authorization: Bearer {accessToken}
- Responses

Success
```
{
  "_id": "63661b7c6566fee9431f189d",
  "title": "voluptatem eligendi optio",
  "tags": [
    "Anker5",
    "Soundcore4"
  ],
  "state": "draft",
  "read_count": 2,
  "body": "fuga et accusamus dolorum perferendis illo ...",
  "author": {
    "_id": "6366199b6566fee9431f1893",
    "firstname": "user",
    "lastname": "2",
    "username": "user2",
    "email": "user2@mail.com",
    "password": "U2FsdGVkX19V6tkpkK1U1YKIc3mqa61E9XbY7GmTVUc=",
    "createdAt": "2022-11-05T08:06:51.801Z",
    "updatedAt": "2022-11-05T08:06:51.801Z",
    "__v": 0
  },
  "reading_time": 1,
  "createdAt": "2022-11-05T08:14:52.749Z",
  "updatedAt": "2022-11-05T08:25:07.724Z",
  "__v": 0
}
```
---

### Get All Published Posts, Search by Title | Author | Tag

- Method: GET
- Header:
    - No Authorization:
- Query params: 
    - page (default: 1)
    - per_page (default: 20)
    - sort (read_count, reading_time, timestamp, default: id)
    - order (options: asc | desc, default: desc)
    - state
    - author
    - title
    - tags

### 1. All published Posts
---

- Route: http://localhost:PORT/api/publishedPosts

- Responses

Success
```
{
  "posts": [
    {
      "_id": "636617f96566fee9431f188d",
      "title": "qui est esse",
      "tags": [
        "Anker2",
        "Soundcore2"
      ],
      "state": "published",
      "read_count": 3,
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil ...",
      "author": "6365edb2e4364c1971dc72b3",
      "reading_time": 1,
      "createdAt": "2022-11-05T07:59:53.338Z",
      "updatedAt": "2022-11-05T08:59:23.699Z",
      "__v": 0
    },
    {
      "_id": "63661b7c6566fee9431f189d",
      "title": "voluptatem eligendi optio",
      "tags": [
        "Anker5",
        "Soundcore4"
      ],
      "state": "published",
      "read_count": 2,
      "body": "fuga et accusamus dolorum perferendis illo ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:14:52.749Z",
      "updatedAt": "2022-11-05T08:25:07.724Z",
      "__v": 0
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}
```
---
### 2. Search published Posts by Title 
---

- Route: http://localhost:PORT/api/publishedPosts?title=voluptatem eligendi optio

- Responses

Success
```
{
  "posts": [
    {
      "_id": "63661b7c6566fee9431f189d",
      "title": "voluptatem eligendi optio",
      "tags": [
        "Anker5",
        "Soundcore4"
      ],
      "state": "published",
      "read_count": 2,
      "body": "fuga et accusamus dolorum perferendis illo ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:14:52.749Z",
      "updatedAt": "2022-11-05T08:25:07.724Z",
      "__v": 0
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}
```
---
### 3. Search published Posts by Author 
---

- Route: http://localhost:PORT/api/publishedPosts?author=6365edb2e4364c1971dc72b3

- Responses

Success
```
{
  "posts": [
    {
      "_id": "6366188c6566fee9431f188f",
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "tags": [
        "Anker1",
        "Soundcore2"
      ],
      "state": "published",
      "read_count": 4,
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita...",
      "author": "6365edb2e4364c1971dc72b3",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:02:20.511Z",
      "updatedAt": "2022-11-05T08:24:38.952Z",
      "__v": 0
    },
    {
      "_id": "636617f96566fee9431f188d",
      "title": "qui est esse",
      "tags": [
        "Anker2",
        "Soundcore2"
      ],
      "state": "published",
      "read_count": 3,
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil ...",
      "author": "6365edb2e4364c1971dc72b3",
      "reading_time": 1,
      "createdAt": "2022-11-05T07:59:53.338Z",
      "updatedAt": "2022-11-05T08:59:23.699Z",
      "__v": 0
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}
```
---
### 4. Search published Posts by Tags 
---

- Route: http://localhost:PORT/api/publishedPosts?tag=Anker5

- Responses

Success
```
{
  "posts": [
    {
      "_id": "63661b7c6566fee9431f189d",
      "title": "voluptatem eligendi optio",
      "tags": [
        "Anker5",
        "Soundcore4"
      ],
      "state": "published",
      "read_count": 2,
      "body": "fuga et accusamus dolorum perferendis illo ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:14:52.749Z",
      "updatedAt": "2022-11-05T08:25:07.724Z",
      "__v": 0
    },
    {
      "_id": "63661b166566fee9431f1899",
      "title": "in quibusdam tempore odit est dolorem",
      "tags": [
        "Anker5",
        "Soundcore5"
      ],
      "state": "published",
      "read_count": 1,
      "body": "itaque id aut magnam\npraesentium quia et ea ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:13:10.420Z",
      "updatedAt": "2022-11-05T08:20:00.155Z",
      "__v": 0
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}
```
---
### User gets a list of their blogs

- Method: GET
- Header:
    - Authorization: Bearer {accessToken}

- Route: http://localhost:PORT/api/posts?author=6366199b6566fee9431f1893

- Responses

Success
```
{
  "message": "Successful!",
  "posts": [
    {
      "_id": "63661b7c6566fee9431f189d",
      "title": "voluptatem eligendi optio",
      "tags": [
        "Anker5",
        "Soundcore4"
      ],
      "state": "published",
      "read_count": 2,
      "body": "fuga et accusamus dolorum perferendis illo ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:14:52.749Z",
      "updatedAt": "2022-11-05T08:25:07.724Z",
      "__v": 0
    },
    {
      "_id": "63661b4c6566fee9431f189b",
      "title": "dolorum ut in voluptas mollitia et saepe quo animi",
      "tags": [
        "Anker4",
        "Soundcore5"
      ],
      "state": "draft",
      "read_count": 0,
      "body": "aut dicta possimus sint mollitia voluptas ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:14:04.816Z",
      "updatedAt": "2022-11-05T08:14:04.816Z",
      "__v": 0
    },
    {
      "_id": "63661b166566fee9431f1899",
      "title": "in quibusdam tempore odit est dolorem",
      "tags": [
        "Anker5",
        "Soundcore5"
      ],
      "state": "published",
      "read_count": 1,
      "body": "itaque id aut magnam\npraesentium quia et ea ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:13:10.420Z",
      "updatedAt": "2022-11-05T08:20:00.155Z",
      "__v": 0
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}
```
---
### Update Post

- Method: PUT
- Header:
    - Authorization: Bearer {accessToken}

- Route: http://localhost:PORT/api/posts/63664c700bba83353dba6c56
- Body: 
```
{
  "state": "published"
}
```
- Responses

Success
```
{
  "message": "Post has been updated!",
  "updatedPost": {
    "_id": "63664c700bba83353dba6c56",
    "title": "qvoluptatem eligendi optio",
    "tags": [
      "Anker5",
      "Soundcore4"
    ],
    "state": "published",
    "read_count": 1,
    "body": "efuga et accusamus dolorum perferendis illo ...",
    "author": "636617c56566fee9431f188a",
    "reading_time": 1,
    "createdAt": "2022-11-05T11:43:44.100Z",
    "updatedAt": "2022-11-05T15:16:38.452Z",
    "__v": 0
  }
}
```
---
### Delete Post

- Method: DELETE
- Header:
    - Authorization: Bearer {accessToken}

- Route: http://localhost:PORT/api/posts/63661b7c6566fee9431f189d
- Body: 
```
No Body
```
- Responses

Success
```
"Post has been deleted!"
```
---
### Only logged In Users - Get All Posts or search by Title, author or tag

- Method: GET
- Header:
    - Authorization: Bearer {accessToken}

- Route: http://localhost:PORT/api/posts
- Body: 
```
No Body
```
- Responses

Success
```
{
  "message": "Successful!",
  "posts": [
    {
      "_id": "63664c700bba83353dba6c56",
      "title": "qvoluptatem eligendi optio",
      "tags": [
        "Anker5",
        "Soundcore4"
      ],
      "state": "published",
      "read_count": 1,
      "body": "efuga et accusamus dolorum perferendis illo ...",
      "author": "636617c56566fee9431f188a",
      "reading_time": 1,
      "createdAt": "2022-11-05T11:43:44.100Z",
      "updatedAt": "2022-11-05T15:16:38.452Z",
      "__v": 0
    },
    {
      "_id": "63661b4c6566fee9431f189b",
      "title": "dolorum ut in voluptas mollitia et saepe quo animi",
      "tags": [
        "Anker4",
        "Soundcore5"
      ],
      "state": "draft",
      "read_count": 0,
      "body": "aut dicta possimus sint mollitia voluptas ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:14:04.816Z",
      "updatedAt": "2022-11-05T08:14:04.816Z",
      "__v": 0
    },
    {
      "_id": "63661b166566fee9431f1899",
      "title": "in quibusdam tempore odit est dolorem",
      "tags": [
        "Anker5",
        "Soundcore5"
      ],
      "state": "published",
      "read_count": 1,
      "body": "itaque id aut magnam\npraesentium quia et ea ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:13:10.420Z",
      "updatedAt": "2022-11-05T13:36:11.153Z",
      "__v": 0
    },
    {
      "_id": "636618e26566fee9431f1891",
      "title": "eum et est occaecati",
      "tags": [
        "Anker2",
        "Soundcore1"
      ],
      "state": "published",
      "read_count": 0,
      "body": "ullam et saepe reiciendis voluptatem adipisci\nsit ...",
      "author": "6366199b6566fee9431f1893",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:03:46.302Z",
      "updatedAt": "2022-11-05T11:28:58.577Z",
      "__v": 0
    },
    {
      "_id": "6366188c6566fee9431f188f",
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "tags": [
        "Anker1",
        "Soundcore2"
      ],
      "state": "published",
      "read_count": 4,
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita...",
      "author": "6365edb2e4364c1971dc72b3",
      "reading_time": 1,
      "createdAt": "2022-11-05T08:02:20.511Z",
      "updatedAt": "2022-11-05T13:38:52.445Z",
      "__v": 0
    },
    {
      "_id": "636617f96566fee9431f188d",
      "title": "qui est esse",
      "tags": [
        "Anker2",
        "Soundcore2"
      ],
      "state": "draft",
      "read_count": 4,
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil reprehenderit dolor est rerum tempore vitae\nsequi sint nihil ...",
      "author": "636617c56566fee9431f188a",
      "reading_time": 1,
      "createdAt": "2022-11-05T07:59:53.338Z",
      "updatedAt": "2022-11-05T12:51:09.545Z",
      "__v": 0
    }
  ],
  "totalPages": 1,
  "currentPage": 1
}
```
---
...


## Contributor
- Tunde Wey

