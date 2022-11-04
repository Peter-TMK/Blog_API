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

## Use the MVC pattern

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
|  author |  string | required |
|  state | number  |  required, enum: ['draft', 'published'], default: 'draft' |
| read_count | Number | required |
|  reading_time | array  |  required |
|  body |   String |  required  |
| createdAt |  date |  required |
| updatedAt |  date |  required |














## Contributor
- Tunde Wey

