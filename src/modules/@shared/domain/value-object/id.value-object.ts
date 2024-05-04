import ValueObject from "./value-object.interface";
import { v4 as uuidv4 } from "uuid"

export default class ID implements ValueObject {
    private id: string;

    constructor(id?: string) {
        this.id = id || uuidv4()
    }

    get Value(): string {
        return this.id
    }
}