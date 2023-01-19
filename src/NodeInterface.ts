import { nodeDefinitions, fromGlobalId } from "graphql-relay";
import { CounterType } from "./graphql";
import { ICounter } from "./types";

const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
    async (globalId: string) => {
      const { id, type } = fromGlobalId(globalId);
      if (type === "Counter") {
        // TODO: retrieve counter by id.
        // return await getCounter(id);
      }
      return null;
    },
    (obj) => {
      if (obj instanceof ICounter) return CounterType;
      return null;
    }
  );
  
  export const NodeInterface = nodeInterface;
  export const NodeField = nodeField;
  export const NodesField = nodesField;
