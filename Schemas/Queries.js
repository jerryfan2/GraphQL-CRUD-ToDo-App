import graphql from "graphql";
import ToDoType from './TypeDefinitions/ToDoType.js';
import dummy_data from "../DUMMY_DATA.json" assert { type: "json" };

const {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull} = graphql;

// when querying a toDo, the owner should be hidden as it is used for authentication
const toDoWithoutOwner = (toDo) => {
    return {
        id: toDo.id,
        description: toDo.description,
        priority: toDo.priority
    }
};

// Query Schema
const getAllToDos = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: 'List of All ToDos',
    resolve: () => dummy_data.map(toDoWithoutOwner)
};

const getToDoByID = {
    type: new GraphQLNonNull(ToDoType),
    description: 'A ToDo by ID',
    args: {
        id: {type: GraphQLInt}
    },
    resolve: (parent, args) => toDoWithoutOwner(dummy_data.find(todo => todo.id === args.id))
};

const getToDoByDescription = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: 'ToDos by Description',
    args: {
        description: {type: GraphQLString}
    },
    resolve(parent, args){
        return dummy_data.filter(todo => todo.description === args.description).map(toDoWithoutOwner);
    }
};

const getToDoByPriority = {
    type: new GraphQLNonNull(new GraphQLList(ToDoType)),
    description: 'ToDos by Priority',
    args: {
        priority: {type: GraphQLString}
    },
    resolve(parent, args){
        return dummy_data.filter(todo => todo.priority === args.priority).map(toDoWithoutOwner);
    }
};

// const getToDoByOwner = {
//     type: new GraphQLNonNull(new GraphQLList(ToDoType)),
//     description: 'ToDos by Owner',
//     args: {
//         owner: {type: GraphQLString}
//     },
//     resolve: (parent, args) => dummy_data.filter(todo => todo.owner === args.owner)
// };

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllToDos: getAllToDos,
        getToDoByID: getToDoByID,
        getToDoByDescription: getToDoByDescription,
        getToDoByPriority: getToDoByPriority
        // getToDoByOwner: getToDoByOwner
    }
});

export default RootQuery;