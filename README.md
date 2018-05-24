
# @ppSolut
> Name: @ppSolut <br>
> [Repository](https://github.com/paulonova/RestApiSlim)

> Members: Paulo Vila Nova, Rooheed Gulistani, Angel Osoria

---

### Uppgift
Skapa ett API med hjälp av PHP-ramverket Slim och databasen MySQL. Till detta API ska vi bygga ett enklare grafiskt gränssnitt. Detta blir som ert eget CMS.

---

### Database Structure

- `users`
  - userID - INT (AI)(PK)
  - username - VARCHAR (50)
  - password - VARCHAR (250)
  - createdAt - DATETIME

- `entries`
  - entryID - INT (AI)(PK)
  - title - VARCHAR(100)
  - content - TEXT
  - createdBy - INT(11)
  - createAt - DATETIME


- `comments`
  - commentID - INT (AI)(PK)
  - entryID - INT(11)
  - content - TEXT
  - createdBy - INT(11)
  - createAt - DATETIME

---

### Routes/ Controllers

#### Entries
- [x] `GET` senaste 20 entries (/api/entries) LIMIT = 20
- [x] `GET` specifik entry med ID (/api/entries/{id})
- [x] `GET` alla entries en user har skapat (/api/entries/user/{id})
- [x] `POST` skapa en ny entry (/api/entry)
- [x] `DELETE` ta bort en entry (/api/entry/{id})
- [x] `PATCH` Updatera en entry (/api/entry/{id})

#### Users
- [x] `GET` hämta alla användare (/api/users)
- [x] `GET` hämta en användare med ID (/api/users/{id})

#### Comments
- [x] `GET` senaste 20 comments (/api/commments) LIMIT=20 
- [x] `GET` specifik comment med ID (/api/comment/{id}) 
- [x] `GET` alla inlägg från en specifik user (/api/comments/{id})
- [x] `GET` alla comments på en entry (/api/entries/user/{id}) 
- [x] `POST` skapa en ny comment (/api/comments) 
- [x] `DELETE` ta bort en comment (/api/comments/delete/{id}) 

#### Other (outside /api)
- [x] `POST` Login function
- [x] `POST` Logout function
- [x] `POST` Register function

---

### Views
- [x] index      - Hantering av hela API.
- [x] login_view - (Login/registrering och efter inloggning visa alla inlägg)
