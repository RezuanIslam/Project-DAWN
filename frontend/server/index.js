import pathfinding from "pathfinding";
import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3001);

const characters = [];

const items = {
  crops: {
    name: "Crops",
    size: [0, 0],
  },
  fieldOfWheat: {
    name: "Field Of Wheat",
    size: [4, 2],
  },
  water: {
    name: "Water",
    size: [1, 0],
  },
};

const farmItem = {
  farm: {
    name: "Farm",
    size: [0, 0],
  },
  tractor: {
    name: "Tractor",
    size: [0, 0],
  },
};

const map = {
  size: [35, 35],
  gridDivision: 2,
  items: [
    {
      ...farmItem.farm,
      gridPosition: [15, 15],
    },
    {
      ...farmItem.tractor,
      gridPosition: [30, 15],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [35, 35],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [35, 37],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [35, 39],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [35, 41],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [35, 43],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [35, 45],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [37, 35],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [37, 37],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [37, 39],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [37, 41],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [37, 43],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [37, 45],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [39, 35],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [39, 37],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [39, 39],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [39, 41],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [39, 43],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [39, 45],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [41, 35],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [41, 37],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [41, 39],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [41, 41],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [41, 43],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [41, 45],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [43, 35],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [43, 37],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [43, 39],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [43, 41],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [43, 43],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [43, 45],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [45, 35],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [45, 37],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [45, 39],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [45, 41],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [45, 43],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [45, 45],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [35, 47],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [37, 47],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [39, 47],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [41, 47],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [43, 47],
    },
    {
      ...items.fieldOfWheat,
      gridPosition: [45, 47],
    },
    {
      ...items.water,
      gridPosition: [35, 35],
    },
    {
      ...items.water,
      gridPosition: [38, 35],
    },
    {
      ...items.water,
      gridPosition: [41, 35],
    },
    {
      ...items.water,
      gridPosition: [44, 35],
    },
    {
      ...items.water,
      gridPosition: [35, 38],
    },
    {
      ...items.water,
      gridPosition: [38, 38],
    },
    {
      ...items.water,
      gridPosition: [41, 38],
    },
    {
      ...items.water,
      gridPosition: [44, 38],
    },
    {
      ...items.water,
      gridPosition: [35, 41],
    },
    {
      ...items.water,
      gridPosition: [38, 41],
    },
    {
      ...items.water,
      gridPosition: [41, 41],
    },
    {
      ...items.water,
      gridPosition: [44, 41],
    },
    {
      ...items.water,
      gridPosition: [35, 44],
    },
    {
      ...items.water,
      gridPosition: [38, 44],
    },
    {
      ...items.water,
      gridPosition: [41, 44],
    },
    {
      ...items.water,
      gridPosition: [44, 44],
    },
    {
      ...items.water,
      gridPosition: [35, 46],
    },
    {
      ...items.water,
      gridPosition: [38, 46],
    },
    {
      ...items.water,
      gridPosition: [41, 46],
    },
    {
      ...items.water,
      gridPosition: [44, 46],
    },
    {
      ...items.crops,
      gridPosition: [28, 35],
    },
    {
      ...items.crops,
      gridPosition: [25, 35],
    },
    {
      ...items.crops,
      gridPosition: [22, 35],
    },
    {
      ...items.crops,
      gridPosition: [19, 35],
    },
    {
      ...items.crops,
      gridPosition: [16, 35],
    },
    {
      ...items.crops,
      gridPosition: [28, 39],
    },
    {
      ...items.crops,
      gridPosition: [25, 39],
    },
    {
      ...items.crops,
      gridPosition: [22, 39],
    },
    {
      ...items.crops,
      gridPosition: [19, 39],
    },
    {
      ...items.crops,
      gridPosition: [16, 39],
    },
    {
      ...items.crops,
      gridPosition: [28, 43],
    },
    {
      ...items.crops,
      gridPosition: [25, 43],
    },
    {
      ...items.crops,
      gridPosition: [22, 43],
    },
    {
      ...items.crops,
      gridPosition: [19, 43],
    },
    {
      ...items.crops,
      gridPosition: [16, 43],
    },
    {
      ...items.crops,
      gridPosition: [28, 47],
    },
    {
      ...items.crops,
      gridPosition: [25, 47],
    },
    {
      ...items.crops,
      gridPosition: [22, 47],
    },
    {
      ...items.crops,
      gridPosition: [19, 47],
    },
    {
      ...items.crops,
      gridPosition: [16, 47],
    },
  ],
};

const grid = new pathfinding.Grid(
  map.size[0] * map.gridDivision,
  map.size[1] * map.gridDivision
);

const finder = new pathfinding.AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true,
});

const findPath = (start, end) => {
  const gridClone = grid.clone();
  const path = finder.findPath(start[0], start[1], end[0], end[1], gridClone);
  return path;
};

const updateGrid = () => {
  // RESET
  for (let x = 0; x < map.size[0] * map.gridDivision; x++) {
    for (let y = 0; y < map.size[1] * map.gridDivision; y++) {
      grid.setWalkableAt(x, y, true);
    }
  }

  map.items.forEach((item) => {
    if (item.walkable || item.wall) {
      return;
    }
    const width =
      item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
    const height =
      item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        grid.setWalkableAt(
          item.gridPosition[0] + x,
          item.gridPosition[1] + y,
          false
        );
      }
    }
  });
};

updateGrid();

const generateRandomPosition = () => {
  for (let i = 0; i < 100; i++) {
    const x = Math.floor(Math.random() * map.size[0] * map.gridDivision);
    const y = Math.floor(Math.random() * map.size[1] * map.gridDivision);
    if (grid.isWalkableAt(x, y)) {
      return [x, y];
    }
  }
};

const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
  console.log("user connected");

  characters.push({
    id: socket.id,
    position: [35, 35],
  });

  socket.emit("hello", {
    map,
    characters,
    id: socket.id,
    items,
  });

  io.emit("characters", characters);

  socket.on("move", (from, to) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    const path = findPath(from, to);
    if (!path) {
      return;
    }
    character.position = from;
    character.path = path;
    io.emit("playerMove", character);
  });

  socket.on("itemsUpdate", (items) => {
    map.items = items;
    characters.forEach((character) => {
      character.path = [];
      character.position = generateRandomPosition();
    });
    updateGrid();
    io.emit("mapUpdate", {
      map,
      characters,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    characters.splice(
      characters.findIndex((character) => character.id === socket.id),
      1
    );
    io.emit("characters", characters);
  });
});
