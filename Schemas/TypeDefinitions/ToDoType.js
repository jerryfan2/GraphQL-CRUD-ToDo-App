import graphql from "graphql";
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql;

const ToDoType = new GraphQLObjectType({
    name: "ToDo",
    description: "ToDoType",
    fields: () => ({
        id: { type: GraphQLInt },
        description: { type: GraphQLString },
        priority: { type: GraphQLString },
    })
})

export default ToDoType;