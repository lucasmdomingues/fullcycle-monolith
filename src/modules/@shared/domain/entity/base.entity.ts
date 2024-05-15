import ID from "../value-object/id.value-object";

export default class BaseEntity {
    private id: ID;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id?: ID, createdAt?: Date, updatedAt?: Date) {
        this.id = id || new ID()
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    get ID(): ID {
        return this.id
    }

    get CreatedAt(): Date {
        return this.createdAt
    }

    get UpdatedAt(): Date {
        return this.updatedAt
    }
}