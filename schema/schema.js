const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                console.log(parentValue, args)
                /* return axios.get(`http://localhost:3000/users?companyId=${parentValue.id}`)
                    .then(res => res.data) */
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                    .then(res => res.data)
            }
        }
    }
    )
})

const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                // console.log(parentValue, args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data)
            }
        }
    }
    )
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                // return _.find(users, { id: args.id })
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(res => res.data)
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(res => res.data)
            }
        }
    }
});

const RootQueryForCompanies = new GraphQLObjectType({
    name: "RootQueryForCompanies",
    fields: {
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(res => res.data)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post(`http://localhost:3000/users`, { firstName, age })
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    // query: RootQueryForCompanies
    mutation
});