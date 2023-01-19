import { executeQueryWithResults } from "./db";

export type CounterResult = {
    id: string;
    name: string;
    description: string;
    visibility: string;
    enter_timestamp: Date;
    last_modified_timestamp: Date;
    counter_addition_count: number;
}

export const selectCounterById = (id: string): Promise<CounterResult | null> => {
    return executeQueryWithResults("selectCounterById.sql", [id]).then(result => {
        if(result.rows.length > 0)
            return result.rows[0] as CounterResult;
        else return null;
    });
}

export type CounterAdditionCountResult = {
    counter_addition_count: number;
}

export const selectCounterAdditionCountByCounterId = (id: string): Promise<CounterAdditionCountResult | null> => {
    return executeQueryWithResults("selectCounterAdditionCountByCounterId.sql", [id]).then(result => {
        if(result.rows.length > 0)
            return result.rows[0] as CounterAdditionCountResult;
        else return null;
    });
}
