import { JsonObject, JsonProperty } from 'typescript-json-serializer';

import Entity from "./Entity";
import MazeBuilder from "./Maze";

interface playerProps {
    x?:number|undefined, 
    y?:number|undefined,
    name?: string|undefined,
    avatar?: string|undefined,
    points?: number|undefined
}

@JsonObject()
export default class Player extends Entity{
    @JsonProperty({type:Number, required:true}) width: number;
    @JsonProperty({type:Number, required:true}) height: number;
    @JsonProperty({type:Number}) points: number;
    @JsonProperty({type:Array<Number>}) direction: Array<number>;
    @JsonProperty({type:String}) name: string;
    @JsonProperty({type:String}) avatar: string;
    @JsonProperty({type:Number}) id: number;
    @JsonProperty({type:Boolean}) local: boolean;
    constructor ({x, y, name, avatar, points}:playerProps) {
        super(x,y);
        this.width = 32;
        this.height = 32;
        this.points = points||0;
        this.direction = [-1, 0];
        this.name = name||"anonymous"
        this.avatar = avatar||"lostChild"
        this.id = -1
        this.local = true
    }
    moveX(mazeObj:MazeBuilder, xf:number){
        if (mazeObj.moveCellContent(this.x, this.y, xf, this.y)) this.x = xf
    }
    moveY(mazeObj:MazeBuilder, yf:number){
        if (mazeObj.moveCellContent(this.x, this.y, this.x, yf)) this.y = yf
    }
    setName(name:string){
        this.name = name
    }
    setAvatar(avatar:string){
        this.avatar=avatar
    }
    setPoints(points:number){
        this.points=points
    }
    setID(id:number){
        this.id = id
    }
}