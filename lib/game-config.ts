export interface PathCell {
  id: number
  x: number
  y: number
  type: "start" | "end" | "star" | "trap" | "path"
  direction: "right" | "down" | "left" | "up" | null
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// 创建棋盘路径
export const createBoardPath = (): PathCell[] => {
  const boardSize = 7
  const path: PathCell[] = []

  const visited = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(false))

  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0], // 右、下、左、上
  ]
  const directionNames: ("right" | "down" | "left" | "up")[] = ["right", "down", "left", "up"]
  let directionIndex = 0
  let row = 0,
    col = 0
  let pathIndex = 0

  for (let i = 0; i < boardSize * boardSize; i++) {
    visited[row][col] = true
    const nextPlannedRow = row + directions[directionIndex][0]
    const nextPlannedCol = col + directions[directionIndex][1]
    let currentDirection = directionNames[directionIndex]

    path.push({
      id: pathIndex++,
      x: col,
      y: row,
      type: "path", // Default to 'path'
      direction: null,
    })

    if (i === boardSize * boardSize - 1) {
      path[path.length - 1].direction = null
      break
    }

    if (
      nextPlannedRow < 0 ||
      nextPlannedRow >= boardSize ||
      nextPlannedCol < 0 ||
      nextPlannedCol >= boardSize ||
      visited[nextPlannedRow][nextPlannedCol]
    ) {
      directionIndex = (directionIndex + 1) % 4
      currentDirection = directionNames[directionIndex]
    }
    path[path.length - 1].direction = currentDirection
    row += directions[directionIndex][0]
    col += directions[directionIndex][1]
  }

  // Set Start and End
  if (path.length > 0) {
    path[0].type = "start"
    path[path.length - 1].type = "end"
    path[path.length - 1].direction = null
  }

  // Randomly place 6 stars and 6 traps
  const pathCellIndices: number[] = []
  for (let i = 0; i < path.length; i++) {
    if (path[i].type === "path") {
      // Only consider default path cells
      // Avoid placing special cells too close to start or end (e.g., not on cell 1 or path.length - 2)
      if (i > 1 && i < path.length - 2) {
        pathCellIndices.push(i)
      }
    }
  }

  const shuffledPathIndices = shuffleArray(pathCellIndices)

  const numStars = 8
  const numTraps = 8

  // Place Stars
  for (let i = 0; i < numStars && i < shuffledPathIndices.length; i++) {
    const starIndex = shuffledPathIndices[i]
    if (path[starIndex]) {
      path[starIndex].type = "star"
    }
  }

  // Place Traps, ensuring they don't overlap with stars
  let trapsPlaced = 0
  for (let i = numStars; i < shuffledPathIndices.length && trapsPlaced < numTraps; i++) {
    const trapIndex = shuffledPathIndices[i]
    if (path[trapIndex] && path[trapIndex].type === "path") {
      // Ensure it's still a path cell
      path[trapIndex].type = "trap"
      trapsPlaced++
    }
  }
  // If not enough distinct spots from the initial shuffle (unlikely for 49 cells),
  // the game will have fewer special cells, which is acceptable.

  return path
}
