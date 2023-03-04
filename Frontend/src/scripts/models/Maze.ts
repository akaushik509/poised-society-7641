// Original JavaScript code by Chirp Internet: chirpinternet.eu
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import Cell from "./Cell";
import Wall from "./Wall";
import Door from "./Door";
import { doorType } from "./Door";

export type mazeType = Array<Array<Cell>>

@JsonObject()
export default class MazeBuilder {
  @JsonProperty({type:Number, required:true}) width:number; 
  @JsonProperty({type:Number, required:true}) height:number; 
  @JsonProperty({type:Number}) cols: number;
  @JsonProperty({type:Number}) rows: number;
  @JsonProperty({type:Array<Array<Cell>>, name:'maze'}) maze: mazeType;
  @JsonProperty({type:Array<Number>}) entrance: Array<number>;
  @JsonProperty({type:Array<Number>}) exit: Array<number>

  constructor(width:number, height:number) {
    this.width = +width;
    this.height = +height;

    this.cols = 2 * this.width + 1;
    this.rows = 2 * this.height + 1;
    this.entrance = [0,0];
    this.exit = [0,0];
    this.maze = this.initArray();
    // place initial walls
    this.maze.forEach((row, r) => {
      row.forEach((cell, c) => {
        switch (r) {
          case 0:
          case this.rows - 1:
            this.maze[r][c].place(new Wall(r,c));
            break;

          default:
            if (r % 2 == 1) {
              if (c == 0 || c == this.cols - 1) {
                this.maze[r][c].place(new Wall(r,c));
              }
            } else if (c % 2 == 0) {
              this.maze[r][c].place(new Wall(r,c));
            }
        }
      });

      if (r == 0) {
        // place exit in top row
        let doorPos = this.posToSpace(this.rand(1, this.width));
        this.maze[r][doorPos].place(new Door(doorType.EXIT, r, doorPos));
        this.exit = [r, doorPos]
      }

      if (r == this.rows - 1) {
        // place entrance in bottom row
        let doorPos = this.posToSpace(this.rand(1, this.width));
        this.maze[r][doorPos].place(new Door(doorType.ENTRANCE, r, doorPos));
        this.entrance = [r, doorPos]
      }
    });

    // start partitioning
    this.partition(1, this.height - 1, 1, this.width - 1);
  }

  initArray() {
    console.log("inside", this)
    return new Array(this.rows)
      .fill(-1)
      .map(() => new Array(this.cols).fill(-1).map(()=>new Cell()));
  }

  rand(min:number, max:number) {
    return min + Math.floor(Math.random() * (1 + max - min));
  }

  posToSpace(x:number) {
    return 2 * (x - 1) + 1;
  }

  posToWall(x:number) {
    return 2 * x;
  }

  inBounds(r:number, c:number) {
    if (
      typeof this.maze[r] == "undefined" ||
      typeof this.maze[r][c] == "undefined"
    ) {
      return false; // out of bounds
    }
    return true;
  }
  // createMaze(matrix:Array<Array<Cell>>){
  //   this.maze = matrix.map(row=>row.map(cell=>{
  //     const c = new Cell()
  //     c.occupied = cell?.occupied
  //   }))
  // }

  moveCellContent(xi:number, yi:number, xf:number, yf:number){
    if (this.inBounds(xf, yf) && !this.maze[xf][yf].isWall()){
      console.log(this.maze[xi][yi].occupied, xf, yf)
      this.maze[xf][yf].place(this.maze[xi][yi].occupied)
      this.maze[xi][yi].place(null)
      return true
    }
    return false
  }

  shuffle(array:Array<boolean>) {
    // sauce: https://stackoverflow.com/a/12646864
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  partition(r1:number, r2:number, c1:number, c2:number) {
    // create partition walls
    // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

    let horiz, vert, x, y, start, end;

    if (r2 < r1 || c2 < c1) {
      return false;
    }

    if (r1 == r2) {
      horiz = r1;
    } else {
      x = r1 + 1;
      y = r2 - 1;
      start = Math.round(x + (y - x) / 4);
      end = Math.round(x + (3 * (y - x)) / 4);
      horiz = this.rand(start, end);
    }

    if (c1 == c2) {
      vert = c1;
    } else {
      x = c1 + 1;
      y = c2 - 1;
      start = Math.round(x + (y - x) / 3);
      end = Math.round(x + (2 * (y - x)) / 3);
      vert = this.rand(start, end);
    }

    for (let i = this.posToWall(r1) - 1; i <= this.posToWall(r2) + 1; i++) {
      for (let j = this.posToWall(c1) - 1; j <= this.posToWall(c2) + 1; j++) {
        if (i == this.posToWall(horiz) || j == this.posToWall(vert)) {
          this.maze[i][j].place(new Wall(i,j));
        }
      }
    }

    let gaps = this.shuffle([true, true, true, false]);

    // create gaps in partition walls

    if (gaps[0]) {
      let gapPosition = this.rand(c1, vert);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = new Cell();
    }

    if (gaps[1]) {
      let gapPosition = this.rand(vert + 1, c2 + 1);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = new Cell();
    }

    if (gaps[2]) {
      let gapPosition = this.rand(r1, horiz);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = new Cell();
    }

    if (gaps[3]) {
      let gapPosition = this.rand(horiz + 1, r2 + 1);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = new Cell();
    }

    // recursively partition newly created chambers

    this.partition(r1, horiz - 1, c1, vert - 1);
    this.partition(horiz + 1, r2, c1, vert - 1);
    this.partition(r1, horiz - 1, vert + 1, c2);
    this.partition(horiz + 1, r2, vert + 1, c2);
  }

  isGap(...cells:any) {
    return cells.every((array:Array<number>) => {
      let row, col;
      [row, col] = array;
      if (!this.maze[row][col].isWall() && !this.maze[row][col].isDoor() && !this.maze[row][col].isPlayer()) {
        return false;
      }
      return true;
    });
  }

  // countSteps(array:Array<Array<number>>, r:number, c:number, val:number, stop:string) {
  //   if (!this.inBounds(r, c)) {
  //     return false; // out of bounds
  //   }

  //   if (array[r][c] <= val) {
  //     return false; // shorter route already mapped
  //   }

  //   if (!this.isGap([r, c])) {
  //     return false; // not traversable
  //   }

  //   array[r][c] = val;

  //   if (this.maze[r][c].includes(stop)) {
  //     return true; // reached destination
  //   }

  //   this.countSteps(array, r - 1, c, val + 1, stop);
  //   this.countSteps(array, r, c + 1, val + 1, stop);
  //   this.countSteps(array, r + 1, c, val + 1, stop);
  //   this.countSteps(array, r, c - 1, val + 1, stop);
  // }

  // getKeyLocation() {
  //   let fromEntrance = this.initArray();
  //   let fromExit = this.initArray();

  //   this.totalSteps = -1;

  //   for (let j = 1; j < this.cols - 1; j++) {
  //     if (this.maze[this.rows - 1][j].includes("entrance")) {
  //       this.countSteps(fromEntrance, this.rows - 1, j, 0, "exit");
  //     }
  //     if (this.maze[0][j].includes("exit")) {
  //       this.countSteps(fromExit, 0, j, 0, "entrance");
  //     }
  //   }

  //   let fc = -1,
  //     fr = -1;

  //   this.maze.forEach((row, r) => {
  //     row.forEach((cell, c) => {
  //       if (typeof fromEntrance[r][c] == "undefined") {
  //         return;
  //       }
  //       let stepCount = fromEntrance[r][c] + fromExit[r][c];
  //       if (stepCount > this.totalSteps) {
  //         fr = r;
  //         fc = c;
  //         this.totalSteps = stepCount;
  //       }
  //     });
  //   });

  //   return [fr, fc];
  // }

  // placeKey() {
  //   let fr, fc;
  //   [fr, fc] = this.getKeyLocation();

  //   this.maze[fr][fc] = ["key"];
  // }

  // display(id) {
  //   this.parentDiv = document.getElementById(id);

  //   if (!this.parentDiv) {
  //     alert('Cannot initialise maze - no element found with id "' + id + '"');
  //     return false;
  //   }

  //   while (this.parentDiv.firstChild) {
  //     this.parentDiv.removeChild(this.parentDiv.firstChild);
  //   }

  //   const container = document.createElement("div");
  //   container.id = "maze";
  //   container.dataset.steps = this.totalSteps;

  //   this.maze.forEach((row) => {
  //     let rowDiv = document.createElement("div");
  //     row.forEach((cell) => {
  //       let cellDiv = document.createElement("div");
  //       if (cell) {
  //         cellDiv.className = cell.join(" ");
  //       }
  //       rowDiv.appendChild(cellDiv);
  //     });
  //     container.appendChild(rowDiv);
  //   });

  //   this.parentDiv.appendChild(container);

  //   return true;
  // }
}

