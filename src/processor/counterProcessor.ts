import { selectCounterById, selectCounterAdditionCountByCounterId } from "../db/counterDAO";
import { CounterVisibilityEnum, ICounter } from "../types";

export const getCounterById = async (id: string): Promise<ICounter | null> => {
    const counterResult = await selectCounterById(id);

    return counterResult ? new ICounter({
        id: counterResult.id,
        name: counterResult.name,
        description: counterResult.description,
        visibility: counterResult.visibility as CounterVisibilityEnum,
        createdTimestamp: counterResult.enter_timestamp.toISOString(),
        updatedTimestamp: counterResult.last_modified_timestamp.toISOString()
    }): null;
}

export const getCounterAdditionCountByCounterId = async (id: string): Promise<number> => {
    return selectCounterAdditionCountByCounterId(id).then(result => result.counter_addition_count);
}
