import { JsonObject, JsonProperty } from 'typescript-json-serializer';

import Entity from "./Entity";

@JsonObject()
export default class Wall extends Entity {
    constructor(x:number|undefined, y:number|undefined){
        super(x,y)
    }
}