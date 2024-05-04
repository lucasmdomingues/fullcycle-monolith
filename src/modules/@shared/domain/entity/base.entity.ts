import ID from "../value-object/id.value-object";

export default class BaseEntity {
    private id: ID;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id?: ID) {
        this.id = id
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    get ID(): ID {
        return this.id
    }

    get CreatedAt(): Date {
        return this.createdAt
    }

    get UpdateAt(): Date {
        return this.updatedAt
    }
}