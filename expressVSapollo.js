const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

// GraphQL-Express server side
const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return UserFindById(args.id)
            }
        }
    })
})


// Apollo server side
// Types Files
type User = {
    id: String
    firstName: String
    age: Int
    company: Company
}
type Company = {
    id: String
    name: String
    employees: [User]
}

// Resolvers File
const resolveFunctions ={
    Query: {
        users(){
            return users
        }
    }
}