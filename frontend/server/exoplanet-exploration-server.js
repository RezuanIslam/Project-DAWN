import pathfinding from "pathfinding";
import { Server } from "socket.io";
const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(3002);

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
  baseLarge: {
    name: "Base Large",
    size: [0, 0],
  },
  spaceship: {
    name: "Spaceship",
    size: [0, 0],
  },
  rock: {
    name: "Rock",
    size: [0, 0],
  },
  rock2: {
    name: "Rock2",
    size: [0, 0],
  },
  rock3: {
    name: "Rock3",
    size: [0, 0],
  },
  rockLarge: {
    name: "Rock Large",
    size: [0, 0],
  },
  rockLarge2: {
    name: "Rock Large (1)",
    size: [0, 0],
  },
  rockLarge3: {
    name: "Rock Large (2)",
    size: [0, 0],
  },
  geodesicDome: {
    name: "Geodesic Dome",
    size: [0, 0],
  },
  rover: {
    name: "Rover",
    size: [0, 0],
  },
};

const map = {
  size: [50, 50],
  gridDivision: 2,
  items: [
    {
      ...farmItem.baseLarge,
      gridPosition: [50, 50],
    },
    {
      ...farmItem.spaceship,
      gridPosition: [75, 50],
    },
    {
      ...farmItem.rockLarge,
      gridPosition: [25, 25],
    },
    {
      ...farmItem.rockLarge2,
      gridPosition: [40, 25],
    },
    {
      ...farmItem.rockLarge,
      gridPosition: [50, 25],
    },
    {
      ...farmItem.rockLarge3,
      gridPosition: [50, 25],
    },
    {
      ...farmItem.rockLarge,
      gridPosition: [55, 25],
    },
    {
      ...farmItem.rockLarge2,
      gridPosition: [70, 25],
    },
    {
      ...farmItem.rockLarge,
      gridPosition: [80, 25],
    },
    {
      ...farmItem.rockLarge3,
      gridPosition: [80, 25],
    },
    {
      ...farmItem.geodesicDome,
      gridPosition: [25, 50],
    },
    {
      ...farmItem.rover,
      gridPosition: [35, 70],
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
      character.position = [50, 50];
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
