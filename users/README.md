# GraphQL Server (Using Express)

Simple GraphQL example application to fetch users and their associated companies from a database/external API.

To get started, in your workspace run the following commands:

```
git clone https://github.com/williamhgough/react-graphql
cd react-graphql/users/
npm i && npm run dev
```

In a separate terminal window run the following command to mock out an external API using dummy data.

```
cd ~/your-workspace-path/react-graphql/users/
npm run json:server
```

Now, open up your browser and navigate to:

```
http://localhost:4000/graphql
```

From here you should see a graphical interface for experimenting with GraphQL queries.

### Example GraphQL Queries:

To fetch a user and their associated company:

```
{
  user(id: "1") {
    id
    firstName
    age
    company {
      id
      name
      description
      location
    }
  }
}

RETURNS =================================
{
  "data": {
    "user": {
      "id": "1",
      "firstName": "Will",
      "age": 23,
      "company": {
        "id": "1",
        "name": "Ampersand Commerce",
        "description": "Web development.",
        "location": "Manchester"
      }
    }
  }
}
```

To fetch a company and it's associated users:
```
{
  company(id: "2") {
    id
    name
    location
    description
    users {
    	id
    	firstName
   		age
    }
  }
}

RETURNS =================================
{
  "data": {
    "company": {
      "id": "2",
      "name": "Facebook",
      "location": "Silicon Valley",
      "description": "Social Network",
      "users": [
        {
          "id": "2",
          "firstName": "Seif",
          "age": 21
        },
        {
          "id": "3",
          "firstName": "Mostafa",
          "age": 21
        }
      ]
    }
  }
}
```