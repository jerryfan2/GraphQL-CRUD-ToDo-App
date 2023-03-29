import graphql, { GraphQLError } from "graphql";
import ToDoType from './TypeDefinitions/ToDoType.js';
import CreateToDoInputType from "./TypeDefinitions/CreateToDoInputType.js";

import dummy_data from "../DUMMY_DATA.json" assert { type: "json" };

const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull} = graphql;

// Mutation Schema
const createToDo = {
    type: ToDoType,
    description: "Create To Do",
    args: {
        toDo: { type: new GraphQLNonNull(CreateToDoInputType) }
    },
    resolve(parent, args) {
        const newToDo = Object.assign({id: dummy_data.length + 1}, args.toDo)
        dummy_data.push(newToDo);
        return newToDo;
    }
};

const updateToDo = {
    type: ToDoType,
    description: "Update To Do",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLString },
        priority: { type: GraphQLString },
        owner: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        for (var i = 0; i < dummy_data.length; i++) {
            if (dummy_data[i].id === args.id) {
                var toUpdate = dummy_data[i];
                if (args.owner !== toUpdate.owner) {
                    throw new GraphQLError('You are not authorized to perform this action.', {
                        extensions: {
                          code: 'FORBIDDEN',
                        },
                    });
                }
                if (args.description) toUpdate.description = args.description;
                if (args.priority) toUpdate.priority = args.priority;
                return toUpdate;
            }
        }
    }
};

const deleteToDo = {
    type: ToDoType,
    description: "Delete To Do",
    args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        owner: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        for (var i = 0; i < dummy_data.length; i++) {
            if (dummy_data[i].id === args.id) {
                const toDelete = dummy_data[i];
                if (args.owner !== toDelete.owner) {
                    throw new GraphQLError('You are not authorized to perform this action.', {
                        extensions: {
                          code: 'FORBIDDEN',
                        },
                    });
                }
                dummy_data.splice(i, 1);
                return toDelete;
            }
        }
    }
};

const Mutation = new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
        createToDo: createToDo,
        updateToDo: updateToDo,
        deleteToDo: deleteToDo
    }
});

export default Mutation;