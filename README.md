# Cando
deskripsi CANDO TBA

## Instalation
before  trying anything make sure all depedencies are installed

```bash
npm install
```

server run in server.js
```bash
npx nodemon server.js
```

## GET data/
To get list of department all Department and list of all Registered User

### status 200
```
{
  "allDepartment": [
    {
      "id": 1,
      "name": "Teknologi Informasi",
      "createdAt": "2020-08-20T05:15:56.477Z",
      "updatedAt": "2020-08-20T05:15:56.477Z"
    }
  ],
  "allUser": [
    {
      "id": 1,
      "name": "user 1",
      "password": "$2a$10$kpqfjr9u7wkKTNXSQnFbqOEZAfj3irK5eOgetZvFzl4lDQQOuYm8G",
      "email": "user1@gmail.com",
      "position": "admin",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg",
      "createdAt": "2020-08-20T05:15:56.634Z",
      "updatedAt": "2020-08-20T05:15:56.634Z"
    },
    {
      "id": 2,
      "name": "user 2",
      "password": "$2a$10$kpqfjr9u7wkKTNXSQnFbqOEZAfj3irK5eOgetZvFzl4lDQQOuYm8G",
      "email": "user2@gmail.com",
      "position": "member",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg",
      "createdAt": "2020-08-20T05:15:56.724Z",
      "updatedAt": "2020-08-20T05:15:56.724Z"
    }
  ]
}
```
<br><br>

## POST data/login

To Login to the system and get more additional information

### req body
```
{
    "email":"user1@gmail.com",
    "password":"123"
} 
```

### status 200
```
{
  token : "<token_code_in_string>",
  name  : "user 1",
  email : "user1@gmail.com",
  position: "admin",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg"
}
```
<br><br>


## GET data/userData
To get detailed information of Registered User

### req headers
```
{
    token : "<token_code_in_string>"
}
```

### status 200
```
{
  "userData": {
    "id": 1,
    "name": "user 1",
    "email": "user1@gmail.com",
    "position": "admin",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg"
  },
  "userDept": [
    {
      "id": 1,
      "name": "Teknologi Informasi"
    }
  ],
  "userTodo": [
    {
      "id": 7,
      "title": "todo 7",
      "deadline": "2020-10-01T00:00:00.000Z",
      "priority": "low",
      "description": "this is how i live now",
      "categoryId": 4,
      "userId": 1,
      "createdAt": "2020-08-20T05:15:56.492Z",
      "updatedAt": "2020-08-20T05:15:56.492Z",
      "category": {
        "id": 4,
        "name": "Launch",
        "departmentId": 2,
        "createdAt": "2020-08-20T05:15:56.487Z",
        "updatedAt": "2020-08-20T05:15:56.487Z",
        "department": {
          "id": 2,
          "name": "Bisnis",
          "createdAt": "2020-08-20T05:15:56.477Z",
          "updatedAt": "2020-08-20T05:15:56.477Z"
        }
      }
    }
  ]
}
```

### status 400
```
Token tidak di temukan
```
<br><br>

## GET /data/:id
To get all information from a specific departement

### req headers
```
{
    token :"<token_code_in_string>"
}
```

## status 200
```
{
  "departmentName": "Bisnis",
  "allUser": [
    {
      "id": 4,
      "name": "user 4",
      "password": "$2a$10$kpqfjr9u7wkKTNXSQnFbqOEZAfj3irK5eOgetZvFzl4lDQQOuYm8G",
      "email": "user4@gmail.com",
      "position": "admin",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg",
      "createdAt": "2020-08-20T05:15:56.908Z",
      "updatedAt": "2020-08-20T05:15:56.909Z"
    },
    {
      "id": 5,
      "name": "user 5",
      "password": "$2a$10$kpqfjr9u7wkKTNXSQnFbqOEZAfj3irK5eOgetZvFzl4lDQQOuYm8G",
      "email": "user5@gmail.com",
      "position": "member",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg",
      "createdAt": "2020-08-20T05:15:57.003Z",
      "updatedAt": "2020-08-20T05:15:57.003Z"
    }
  ],
  "categories": [
    {
      "id": 3,
      "name": "Preparation",
      "departmentId": 2,
      "createdAt": "2020-08-20T05:15:56.487Z",
      "updatedAt": "2020-08-20T05:15:56.487Z",
      "todos": [
        {
          "id": 5,
          "title": "todo 5",
          "deadline": "2020-02-01T00:00:00.000Z",
          "priority": "medium",
          "description": "this is how i live now",
          "categoryId": 3,
          "userId": 5,
          "createdAt": "2020-08-20T05:15:56.492Z",
          "updatedAt": "2020-08-20T05:15:56.492Z",
          "user": {
            "id": 5,
            "name": "user 5",
            "password": "$2a$10$kpqfjr9u7wkKTNXSQnFbqOEZAfj3irK5eOgetZvFzl4lDQQOuYm8G",
            "email": "user5@gmail.com",
            "position": "member",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg",
            "createdAt": "2020-08-20T05:15:57.003Z",
            "updatedAt": "2020-08-20T05:15:57.003Z"
          }
        },
        {
          "id": 6,
          "title": "todo 6",
          "deadline": "2020-06-01T00:00:00.000Z",
          "priority": "high",
          "description": "this is how i live now",
          "categoryId": 3,
          "userId": 6,
          "createdAt": "2020-08-20T05:15:56.492Z",
          "updatedAt": "2020-08-20T05:15:56.492Z",
          "user": {
            "id": 6,
            "name": "user 6",
            "password": "$2a$10$kpqfjr9u7wkKTNXSQnFbqOEZAfj3irK5eOgetZvFzl4lDQQOuYm8G",
            "email": "user6@gmail.com",
            "position": "member",
            "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg",
            "createdAt": "2020-08-20T05:15:57.098Z",
            "updatedAt": "2020-08-20T05:15:57.098Z"
          }
        }
      ]
    }
  ]
}
```

## status 400
No Token in Headers
```
Token tidak di temukan
```
<br>
Department ID Params is not Registered
```
Department ini tidak terdaftar
```

## status 404
User unauthorized in this department
```
"Not Authorized in this Department"
```
<br><br>

## POST data/todo
Create To Do

### req body
```
{
  title: "todo 14",
  deadline: "2020-05-17T01:03:10.000Z",
  priority: "low",
  description: "Di sini ada siapa ya",
  categoryId: 1,
  userId: 1
}
```

## status 201
```
{
  id: 13,
  title: "todo 14",
  deadline: "2020-05-17T01:03:10.000Z",
  priority: "low",
  description: "Di sini ada siapa ya",
  categoryId: 1,
  userId: 1,
  updatedAt: "2020-08-21T13:24:49.422Z",
  createdAt: "2020-08-21T13:24:49.422Z"
}
```

## status 400

Title tidak di isi
```
Title To Do Harus di Isi
```
<br>
Deadline tidak di isi

```
Deadline To Do Harus di Isi
```
<br>
Priority tidak di isi

```
Priority To Do Harus di Isi
```
<br>
Deskripsi tidak di isi

```
Deskripsi To Do Harus di Isi
```
<br>
Category ID tidak di isi

```
Category ID To Do Harus di Isi
```
<br>
User ID tidak di isi

```
User ID To Do Harus di Isi
```
<br>

<br><br>

## PUT data/todo/:id
Edit To Do, but only authorized personel can edit it
Authorized personel are Admin or User related to that To Do


### req headers
```
{
    token :"<token_code_in_string>"
}
```

### req body
```
{
  	title   :"todo 1",
	deadline:"2020-05-17T01:03:10.000Z",
	priority:"medium",
	description :"Di sini ada siapa ya",
	categoryId  :"2",
	userId  :"6"
}
```

## status 200

```
{

  id: 1,
  title: "todo 1",
  deadline: "2020-05-17T01:03:10.000Z",
  priority: "medium",
  description: "Di sini ada siapa ya",
  categoryId: 2,
  userId: 6,
  createdAt: "2020-08-20T05:15:56.492Z",
  updatedAt: "2020-08-20T14:34:57.195Z"

}
```

## status 400

Title tidak di isi
```
Title To Do Harus di Isi
```
<br>
Deadline tidak di isi

```
Deadline To Do Harus di Isi
```
<br>
Priority tidak di isi

```
Priority To Do Harus di Isi
```
<br>
Deskripsi tidak di isi

```
Deskripsi To Do Harus di Isi
```
<br>
Category ID tidak di isi

```
Category ID To Do Harus di Isi
```
<br>
User ID tidak di isi

```
User ID To Do Harus di Isi
```
<br>

User ID tidak terdaftar

```
User tidak terdaftar
```
<br>

Category ID tidak terdaftar

```
Department tidak terdaftar
```
<br>


## GET data/todo/:id
Find One Specific To Do after Log In

### req headers
```
{
    token :"<token_code_in_string>"
}
```

### status 200
```
{
  id: 1,
  title: "todo 1",
  deadline: "2020-05-17T01:03:10.000Z",
  priority: "medium",
  description: "Di sini ada siapa ya",
  categoryId: 2,
  userId: 6,
  createdAt: "2020-08-20T05:15:56.492Z",
  updatedAt: "2020-08-22T04:59:35.863Z"
}
```

### status 400
```
To Do tidak di temukan
```
<br><br>

## DELETE data/todo/:id
Admin can delete specific todo

### req headers
```
{
    token: "<token_code_in_string>"
}
```

### status 200
Success delete To Do
```
Berhasil Delete
```

### status 404
Try to delete To Do without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```

### status 400
Try to delete unexisting To Do

```
Todo tidak di temukan
```

## POST data/category
Create new Category in specific department with Admin Position

### req headers
```
{
    token:"<token_code_in_string>"
}
```

### req body
```
{
	name:"Test Category",
	departmentId:"1"
}
```

### status 200
Success add new Category

```
{
  "id": 7,
  "name": "Test Category",
  "departmentId": 1,
  "updatedAt": "2020-08-22T05:32:45.932Z",
  "createdAt": "2020-08-22T05:32:45.932Z"
}
```


### status 400
Creating new Category to Unregistered Department

```
Department Tidak Terdaftar
```

Adding new Category without filling name

```
Nama Category Harus Di Isi
```

Adding new Category without filling Department ID

```
Department ID harus di isi
```

### status 404
Creating new Category without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```
<br><br>

## DELETE data/category/:id
Admin can delete specific category

### req headers
```
{
    token: "<token_code_in_string>"
}
```

### status 200
Success delete Category
```
Berhasil Delete
```

### status 404
Try to delete To Do without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```

### status 400
Try to delete unexisting Category

```
Category tidak di temukan
```

## PUT data/category/:id
Edit Category, but only Admin Position can edit it


### req headers
```
{
    token :"<token_code_in_string>"
}
```

### req body
```
{
	name:"Technology Business",
	departmentId:1
}
```

## status 200

```
{
  id: 3,
  name: "BackEnd Progress",
  departmentId: 1,
  createdAt: "2020-08-20T05:15:56.487Z",
  updatedAt: "2020-08-22T05:44:30.083Z"
}
```

## status 400

Try to Edit unexisting Category

```
Category tidak di temukan
```


Name tidak di isi
```
Nama Category Harus di Isi
```
<br>
Department ID tidak di isi

```
Department ID Harus Di Isi
```
<br>

### status 404
Try to edit Category without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```


## GET data/category/:id
Find One Category with it's data

### req headers
```
    token : "<token_code_in_string>"
```

### status 200

```
{
  id: 1,
  name: "Preparation",
  departmentId: 1,
  createdAt: "2020-08-20T05:15:56.487Z",
  updatedAt: "2020-08-20T05:15:56.487Z",
  todos": [
    {
      id": 2,
      title": "todo 2",
      deadline: "2020-10-01T00:00:00.000Z",
      priority: "medium",
      description": "this is how i live now",
      categoryId: 1,
      userId": 2,
      createdAt: "2020-08-20T05:15:56.492Z",
      updatedAt: "2020-08-20T05:15:56.492Z"
    },
    {
      id: 9,
      title: "todo 9",
      deadline: "2020-06-01T00:00:00.000Z",
      priority: "high",
      description: "this is how i live now",
      categoryId: 1,
      userId: 3,
      createdAt: "2020-08-20T05:15:56.492Z",
      updatedAt: "2020-08-20T05:15:56.492Z"
    }
  ]
}
```

### status 400

Try to find unexisting Category

```
Category tidak di temukan
```

## POST data/user
create new User with Admin Position


### req headers
```
{
    token:"<token_code_in_string>"
}
```

### req body
```
{
	departmentId:"1",
	name":user test3",
	password:"123",
	email:"usertest20@gmail.com",
	position:"member",
    imageUrl:"https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg"
}
```

### status 200
Success add new User

```
{
  id: 12,
  name: "user test3",
  password: "$2a$10$hGc9H8Rj6wOTthOn.baLF.uRuhAIJr5DngC3kCjYLzNHuaY1er7we",
  email: "usertest20@gmail.com",
  position: "member",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg",
  "updatedAt": "2020-08-21T15:52:59.422Z",
  "createdAt": "2020-08-21T15:52:59.422Z"
}
```


### status 400
Creating new User with existing email address

```
Email Sudah Terdaftar
```

Creating new User without filling Department ID

```
Department ID Tidak Terdaftar
```

Creating new User without filling User Name

```
Nama User Harus di Isi
```

Creating new User without filling User Password

```
Password User Harus di Isi
```

Creating new User without filling User Email

```
Email User Harus di Isi
```

Creating new User without filling User Position

```
Position User Harus di Isi
```

Creating new User without filling User ImageUrl

```
ImageUrl User Harus di Isi
```


### status 404
Creating new User without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```
<br><br>

## DELETE data/user/:id
Admin can delete specific User

### req headers
```
{
    token: "<token_code_in_string>"
}
```

### status 200
Success delete User
```
Berhasil Delete User
```

### status 404
Try to delete To Do without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```

### status 400
Try to delete unexisting User

```
User tidak ditemukan
```

<br><br>

## POST data/user/add
Adding User to Specific Department with Admin Position


### req headers
```
{
    token:"<token_code_in_string>"
}
```

### req body
```
{
    userId:"1",
	departmentId:"2"
}
```

### status 200
Success add new User

```
Berhasil add user 1 ke Department Bisnis
```


### status 400
Adding new User but User ID is not Filled

```
User ID dan Department ID harus di isi
```

Adding new User but Department ID is not Filled

```
User ID dan Department ID harus di isi
```

Adding new User to unexisting Department

```
User atau Department Tidak Terdaftar
```

Adding unexisting User to Department

```
User atau Department Tidak Terdaftar
```


### status 404
Adding new User to new Department without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```
<br><br>

## DELETE data/remove
Admin can Remove specific User from Specific Department

### req headers
```
{
    token: "<token_code_in_string>"
}
```

### req body
```
{
    userId:"2",
	departmentId:"2"
}
```

### status 200
Success delete User
```
User user 2 berhasil di keluarkan dari department Bisnis
```

### status 404
Try to remove User without Admin Position

```
Kamu tidak terotorisasi untuk ini, hubungi Admin
```

### status 400
Try to Remove User in that not registered in specific Department

```
User Sudah Tidak Terdaftar Di Department Ini
```

Try to Remove User from unexisting Department

```
Department Tidak Terdaftar
```

Try to Remove unexisting User
```
Department Tidak Terdaftar
```
Try to Remove but User ID is not filled
```
User ID harus di isi
```

Try to Remove but Department ID is not filled
```
Department ID harus di isi
```


<br><br>








