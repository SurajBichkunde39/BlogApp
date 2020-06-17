# BlogApp
Blog App following RESTful  convention.


| Name       | Path           | HTTP Verb  |Purpose                                             |
| -----------|:-------------: | ----------:|----------------------------------------------------|
| INDEX      | /blogs         |   GET      | List all blogs                                     |
| NEW        | /blogs/new     |   GET      | Show new blog form                                 |
| CREATE     | /blogs         |   POST     | Create new blog and redirect to all blogs          |
|SHOW        | /blogs/:id     |   GET      | Show complete blog with given id                   |
|EDIT        | /blogs/:id/edit|   GET      | Show edit form for give given blog post            |
|UPDATE      | /blogs/:id     |   PUT      | Update a perticular blog, redirect to updated blog |
|DESTORY     | /blogs/:id     |   DELETE   | Delete the perticular blog and redirect to all     |
