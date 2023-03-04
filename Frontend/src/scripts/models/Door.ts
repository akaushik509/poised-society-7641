import { JsonObject, JsonProperty } from 'typescript-json-serializer';

import Entity from "./Entity";

export enum doorType {
    ENTRANCE = "entrance",
    EXIT = "exit"
}

@JsonObject()
export default class Door extends Entity {
    @JsonProperty({type:String}) type: doorType;
    constructor (type:doorType, x:number, y:number){
        super(x,y)
        this.type = type
    }
}