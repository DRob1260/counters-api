import {
    GraphQLEnumType,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import { globalIdField, connectionArgs } from "graphql-relay";
import { NodeField, NodeInterface, NodesField } from "./NodeInterface";
import { ICounter } from "./types";
import { getCounterById } from "./processor/counterProcessor";

export const VisibilityEnumType = new GraphQLEnumType({
    name: "CounterVisibility",
    values: {
        PRIVATE: { value: "PRIVATE" },
        UNLISTED: { value: "UNLISTED" },
        PUBLIC: { value: "PUBLIC" }
    }
});

export const CounterType = new GraphQLObjectType<ICounter>({
    name: "Counter",
    description: "Counts things",
    fields: () => ({
        id: globalIdField("Counter"),
        name: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: ({ name }) => name
        },
        description: {
            type: GraphQLString,
            resolve: ({ description }) => description
        },
        count: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: ({ count }) => count
        },
        visibility: {
            type: VisibilityEnumType,
            resolve: ({ visibility }) => visibility
        },
        createdTimestamp: {
            type: GraphQLString,
            resolve: ({ createdTimestamp }) => createdTimestamp
        },
        updatedTimestamp: {
            type: GraphQLString,
            resolve: ({ updatedTimestamp }) => updatedTimestamp
        }
    }),
    interfaces: () => [NodeInterface]
});

export const QueryType = new GraphQLObjectType({
    name: "Query",
    description: "The root of all... queries",
    fields: () => ({
        node: NodeField,
        nodes: NodesField,
        counter: {
            type: CounterType,
            args: {
                ...connectionArgs,
                id: {
                    type: GraphQLID
                }
            },
            resolve: (_, args) => getCounterById(args.id)
        }
    }),
});

// const CounterCreate = mutationWithClientMutationId({
//     name: "CounterCreate",
//     inputFields: {
//         name: {
//             type: new GraphQLNonNull(GraphQLString)
//         },
//         description: {
//             type: GraphQLString
//         },
//         visibility: {
//             type: new GraphQLNonNull(VisibilityEnumType)
//         },
//         createdTimestamp: {
//             type: new GraphQLNonNull(GraphQLString)
//         },
//         updatedTimestamp: {
//             type: new GraphQLNonNull(GraphQLString)
//         }
//     },
//     mutateAndGetPayload: async ({ name, description, visibility }),
// });
