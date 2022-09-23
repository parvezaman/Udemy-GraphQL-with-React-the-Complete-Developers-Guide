const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema,GraphQLList } = graphql;


// let desiredCompany;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        /* company: {
            type: CompanyType,
            resolve(parentValue, args) {
                // console.log(parentValue, args);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(res => res.data)
            }
        } */
    }
});


const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
         user: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                console.log(parentValue, args)
                return axios.get(`http://localhost:3000/users?companyId=${parentValue.id}`)
                    .then(res => res.data)
                    // .then(data => console.log(data)) 
                    /* .then(data => {
                        // console.log(data);
                        const myItems = [...new Map(data.map(item => [item["companyId"], item])).values()];
                        data = myItems.map(item=>item);
                        console.log(data);
                    })  */
            }
        } 
    }
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                // return _.find(users, { id: args.id })
                return axios.get(`http://localhost:3000/users/${args.id}`)
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
})

module.exports = new GraphQLSchema({
    // query: RootQuery,
    query: RootQueryForCompanies
});