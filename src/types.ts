export enum CounterVisibilityEnum {
    PRIVATE = "PRIVATE",
    UNLISTED = "UNLISTED",
    PUBLIC = "PUBLIC"
}

export class ICounter {
    id: string;
    name: string;
    description: string;
    count: number;
    visibility: CounterVisibilityEnum;
    createdTimestamp: string;
    updatedTimestamp: string;

    constructor(data: ICounter) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.count = data.count;
        this.visibility = data.visibility;
        this.createdTimestamp = data.createdTimestamp;
        this.updatedTimestamp = data.updatedTimestamp;
    }
}