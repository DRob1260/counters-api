import { selectCounterById, selectCounterAdditionCountByCounterId } from "../db/counterDAO";
import { CounterVisibilityEnum, ICounter } from "../types";

export const getCounterById = async (id: string): Promise<ICounter | null> => {
    const counterResult = await selectCounterById(id);
    const counterCountResult = await selectCounterAdditionCountByCounterId(id);

    Date.UTC
    return counterResult ? new ICounter({
        id: counterResult.id,
        name: counterResult.name,
        description: counterResult.description,
        visibility: counterResult.visibility as CounterVisibilityEnum,
        createdTimestamp: counterResult.enter_timestamp.toISOString(),
        updatedTimestamp: counterResult.last_modified_timestamp.toISOString(),
        count: counterCountResult?.counter_addition_count || 0
    }): null;
}