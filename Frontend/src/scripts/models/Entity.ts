import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export default class Entity {
    @JsonProperty({type:Number, required:true}) x: number;
    @JsonProperty({type:Number, required:true}) y: number;
    constructor (x:number|undefined,y:number|undefined){
        this.x = x||0;
        this.y = y||0;
    }
    setPos(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}