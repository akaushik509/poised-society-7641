import { JsonObject, JsonProperty } from 'typescript-json-serializer';

import Entity from "./Entity"
import Wall from "./Wall"
import Door from "./Door"
import Player from "./Player"

@JsonObject()
export default class Cell {
    @JsonProperty({type:Entity||null}) occupied: null| Entity
    constructor () {
      this.occupied = null
    }
    place(entity: Entity|null):void{
      this.occupied = entity
    }
    isWall(){
        return this.occupied instanceof Wall
    }
    isDoor(){
        return this.occupied instanceof Door
    }
    isPlayer(){
      return this.occupied instanceof Player
    }
    isLocalPlayer(){
        return this.occupied instanceof Player && this.occupied.local
    }
    isRemotePlayer(){
      return this.occupied instanceof Player && this.occupied.local
    }
}