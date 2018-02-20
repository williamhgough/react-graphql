// Import GraphQL and axios
const graphql = require("graphql");
const axios = require("axios");

// Pull in necessary GraphQL helpers
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull,
} = graphql;

// Define Company schema
const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        location: {
            type: GraphQLString,
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios
                    .get(
                        `http://localhost:3000/companies/${
                            parentValue.id
                        }/users`,
                    )
                    .then(resp => resp.data);
            },
        },
    }),
});

// Define User schema
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        age: {
            type: GraphQLInt,
        },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios
                    .get(
                        `http://localhost:3000/companies/${
                            parentValue.companyId
                        }`,
                    )
                    .then(resp => resp.data);
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, { id }) {
                return axios
                    .get(`http://localhost:3000/users/${id}`)
                    .then(resp => resp.data);
            },
        },
        company: {
            type: CompanyType,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, { id }) {
                return axios
                    .get(`http://localhost:3000/companies/${id}`)
                    .then(resp => resp.data);
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
                companyId: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, { firstName, age, companyId }) {
                return axios
                    .post("http://localhost:3000/users", {
                        firstName,
                        age,
                        companyId,
                    })
                    .then(res => res.data);
            },
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
            resolve(parentValue, { id }) {
                return axios
                    .delete(`http://localhost:3000/users/${id}`)
                    .then(res => res.data);
            },
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios
                    .patch(`http://localhost:3000/users/${args.id}`, args)
                    .then(res => res.data);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
