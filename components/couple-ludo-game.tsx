"use client"

import { useState, useEffect, useCallback } from "react"
import { createBoardPath, type PathCell } from "@/lib/game-config"
import {
  Rocket,
  Trophy,
  Star,
  Bomb,
  Plane,
  BirdIcon as Helicopter,
  Heart,
  Sparkles,
  CheckCircle,
  XCircle,
  RotateCcw,
  Users,
  Flame,
  Lock,
  Shuffle,
  ArrowLeft,
} from "lucide-react"
import type { JSX } from "react/jsx-runtime"
import { type Language, type Translations, loadTranslations, interpolate } from "@/lib/i18n"
import LanguageSelector from "./language-selector"

type GameState = "start" | "playing" | "task" | "win" | "winTask" | "moving"
type GameMode = "normal" | "love" | "couple" | "advanced" | "intimate" | "mixed"
type PlayerColor = "red" | "blue"
type TaskType = "star" | "trap" | "collision"

interface CurrentTask {
  description: string
  executor: PlayerColor
  target: PlayerColor
}

interface WinTaskOption {
  id: number
  description: string
}

// Shuffle function (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Game mode configurations
const gameModeIcons = {
  normal: Users,
  love: Heart,
  couple: Sparkles,
  advanced: Flame,
  intimate: Lock,
  mixed: Shuffle,
}

const gameModeColors = {
  normal: "from-blue-400 to-blue-600",
  love: "from-pink-400 to-pink-600",
  couple: "from-purple-400 to-purple-600",
  advanced: "from-red-400 to-red-600",
  intimate: "from-gray-700 to-gray-900",
  mixed: "from-indigo-400 via-purple-500 to-pink-500",
}

const gameModeEmojis = {
  normal: "😊",
  love: "💕",
  couple: "💖",
  advanced: "🔥",
  intimate: "🔒",
  mixed: "🎲",
}

export default function CoupleLudoGame() {
  const [gameState, setGameState] = useState<GameState>("start")
  const [gameMode, setGameMode] = useState<GameMode>("normal")
  const [boardPath, setBoardPath] = useState<PathCell[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<PlayerColor>("red")
  const [redPosition, setRedPosition] = useState(0)
  const [bluePosition, setBluePosition] = useState(0)
  const [diceValue, setDiceValue] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [currentTask, setCurrentTask] = useState<CurrentTask | null>(null)
  const [taskType, setTaskType] = useState<TaskType | null>(null)
  const [winner, setWinner] = useState<PlayerColor | null>(null)
  const [isMoving, setIsMoving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [taskQueue, setTaskQueue] = useState<string[]>([])
  const [isLoadingTasks, setIsLoadingTasks] = useState(false)
  const [language, setLanguage] = useState<Language>("zh")
  const [translations, setTranslations] = useState<Translations | null>(null)
  const [winTaskOptions, setWinTaskOptions] = useState<WinTaskOption[]>([])
  const [selectedWinTask, setSelectedWinTask] = useState<WinTaskOption | null>(null)

  useEffect(() => {
    const path = createBoardPath()
    setBoardPath(path)

    // Load initial language
    loadTranslations(language).then(setTranslations)
  }, [])

  useEffect(() => {
    loadTranslations(language).then(setTranslations)
  }, [language])

  const loadTasks = useCallback(
    async (mode: GameMode, lang: Language) => {
      setIsLoadingTasks(true)
      try {
        // Try to load language-specific tasks first
        let response = await fetch(`/tasks/${mode}-${lang}.json`)

        // If language-specific tasks don't exist, fall back to Chinese
        if (!response.ok && lang !== "zh") {
          response = await fetch(`/tasks/${mode}.json`)
        }

        if (!response.ok) {
          throw new Error(`Failed to load tasks for mode: ${mode}`)
        }

        const tasks: string[] = await response.json()
        setTaskQueue(shuffleArray(tasks))
      } catch (error) {
        console.error("Error loading tasks:", error)
        const fallbackTasks = translations
          ? [translations.tasks.emptyQueue]
          : ["做一个鬼脸", "给对方一个赞美", "分享一个小秘密"]
        setTaskQueue(shuffleArray(fallbackTasks))
      } finally {
        setIsLoadingTasks(false)
      }
    },
    [translations],
  )

  const generateWinTasks = useCallback(() => {
    // 从当前任务队列中随机选择3个任务作为胜利任务选项
    const availableTasks = taskQueue.length > 0 ? taskQueue : [
      translations?.tasks.emptyQueue || "给对方一个温暖的拥抱",
      "说出三个对方的优点",
      "一起做一件浪漫的事"
    ]
    
    const shuffled = shuffleArray([...availableTasks])
    const winTasks: WinTaskOption[] = shuffled.slice(0, 3).map((task, index) => ({
      id: index + 1,
      description: task
    }))
    
    setWinTaskOptions(winTasks)
  }, [taskQueue, translations])

  const switchTurn = useCallback(() => {
    setCurrentPlayer((prev) => (prev === "red" ? "blue" : "red"))
  }, [])

  const checkSpecialEvents = useCallback(
    (newPosition: number, player: PlayerColor) => {
      setIsMoving(false)
      setGameState("playing")

      const otherPlayerPosition = player === "red" ? bluePosition : redPosition

      if (newPosition === otherPlayerPosition && newPosition !== 0 && newPosition !== boardPath.length - 1) {
        setTimeout(() => {
          setTaskType("collision")
          triggerTask("collision", player)
        }, 300)
        return
      }

      // 只有正好到达终点才获胜
      if (newPosition === boardPath.length - 1) {
        setTimeout(() => {
          setWinner(player)
          // 生成3个获胜任务选项
          generateWinTasks()
          setGameState("win")
        }, 300)
        return
      }

      const cellType = boardPath[newPosition]?.type
      if (cellType === "star") {
        setTimeout(() => {
          setTaskType("star")
          triggerTask("star", player)
        }, 300)
      } else if (cellType === "trap") {
        setTimeout(() => {
          setTaskType("trap")
          triggerTask("trap", player)
        }, 300)
      } else {
        setTimeout(switchTurn, 300)
      }
    },
    [boardPath, bluePosition, redPosition, switchTurn, generateWinTasks],
  )

  // 处理胜利任务选择
  const handleWinTaskSelect = useCallback((task: WinTaskOption) => {
    setSelectedWinTask(task)
    setGameState("winTask")
  }, [])

  // 完成胜利任务
  const handleWinTaskComplete = useCallback(() => {
    setGameState("win")
    setSelectedWinTask(null)
    setWinTaskOptions([])
  }, [])

  // 重新开始游戏
  const restartFromWin = useCallback(() => {
    setGameState("start")
    setWinner(null)
    setSelectedWinTask(null)
    setWinTaskOptions([])
  }, [])

  const movePlayerStep = useCallback(
    (targetPosition: number, player: PlayerColor, currentStepPos?: number) => {
      const startPosition = currentStepPos ?? (player === "red" ? redPosition : bluePosition)

      if (startPosition >= targetPosition) {
        checkSpecialEvents(targetPosition, player)
        return
      }

      const nextPosition = startPosition + 1
      if (player === "red") setRedPosition(nextPosition)
      else setBluePosition(nextPosition)

      setTimeout(() => movePlayerStep(targetPosition, player, nextPosition), 300)
    },
    [redPosition, bluePosition, checkSpecialEvents],
  )

  const movePlayerToEndAndBack = useCallback(
    (endPosition: number, finalPosition: number, player: PlayerColor, totalSteps: number) => {
      const startPosition = player === "red" ? redPosition : bluePosition
      let currentStep = 0
      let currentPos = startPosition
      let hasReachedEnd = false
      
      const step = () => {
        if (currentStep >= totalSteps) {
          // 移动完成，检查最终位置
          if (finalPosition === endPosition) {
            // 最终位置在终点，玩家获胜
            setTimeout(() => {
              setWinner(player)
              generateWinTasks()
              setGameState("win")
              setIsMoving(false)
            }, 300)
          } else {
            // 最终位置不在终点，继续游戏
            checkSpecialEvents(finalPosition, player)
          }
          return
        }
        
        currentStep++
        
        // 先向终点移动
        if (!hasReachedEnd) {
          currentPos++
          if (currentPos >= endPosition) {
            hasReachedEnd = true
            currentPos = endPosition
          }
        } else {
          // 已到达终点，开始后退
          if (currentPos > finalPosition) {
            currentPos--
          }
        }
        
        if (player === "red") setRedPosition(currentPos)
        else setBluePosition(currentPos)
        
        setTimeout(step, 300)
      }
      
      step()
    },
    [redPosition, bluePosition, checkSpecialEvents, generateWinTasks],
  )

  const movePlayer = useCallback(
    (steps: number) => {
      const currentPos = currentPlayer === "red" ? redPosition : bluePosition
      const maxPosition = boardPath.length - 1
      let targetPosition = currentPos + steps

      // 如果正好到达或超出终点，需要特殊处理
      if (targetPosition >= maxPosition) {
        if (targetPosition === maxPosition) {
          // 正好到达终点，直接移动到终点
          setIsMoving(true)
          setGameState("moving")
          movePlayerStep(targetPosition, currentPlayer)
        } else {
          // 超过终点，需要先到终点再退回多余步数
          const overshoot = targetPosition - maxPosition
          const finalPosition = maxPosition - overshoot
          // 确保不会退到负数位置
          const safePosition = Math.max(0, finalPosition)
          
          setIsMoving(true)
          setGameState("moving")
          movePlayerToEndAndBack(maxPosition, safePosition, currentPlayer, steps)
        }
      } else {
        // 正常移动
        setIsMoving(true)
        setGameState("moving")
        movePlayerStep(targetPosition, currentPlayer)
      }
    },
    [currentPlayer, redPosition, bluePosition, boardPath.length, movePlayerStep, movePlayerToEndAndBack],
  )

  const rollDice = () => {
    if (isRolling || isMoving || isLoadingTasks) return
    setIsRolling(true)
    setDiceValue(null)

    let count = 0
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
      count++
      if (count > 10) {
        clearInterval(interval)
        const finalValue = Math.floor(Math.random() * 6) + 1
        setDiceValue(finalValue)
        setIsRolling(false)
        movePlayer(finalValue)
      }
    }, 80)
  }

  const triggerTask = (type: TaskType, PCOnCell: PlayerColor) => {
    if (taskQueue.length === 0) {
      console.warn("Task queue is empty!")
      const emptyMessage = translations?.tasks.emptyQueue || "任务队列空了！休息一下吧！"
      setCurrentTask({ description: emptyMessage, executor: PCOnCell, target: PCOnCell })
      setGameState("task")
      return
    }

    const currentTaskDescription = taskQueue[0]
    setTaskQueue((prev) => [...prev.slice(1), prev[0]])

    let executor: PlayerColor
    if (type === "star") {
      executor = PCOnCell === "red" ? "blue" : "red"
    } else if (type === "trap") {
      executor = PCOnCell
    } else {
      executor = PCOnCell === "red" ? "blue" : "red"
    }

    setCurrentTask({ description: currentTaskDescription, executor, target: PCOnCell })
    setGameState("task")
  }

  const animateTaskOutcomeMove = useCallback(
    (targetPosition: number, player: PlayerColor, originalPosition: number) => {
      setIsMoving(true)
      setGameState("moving")

      let currentAnimatedPos = originalPosition

      const step = () => {
        if (currentAnimatedPos === targetPosition) {
          setIsMoving(false)
          setGameState("playing")
          setCurrentTask(null)
          setTaskType(null)

          // 只有正好到达终点才获胜
          if (targetPosition === boardPath.length - 1) {
            setWinner(player)
            setGameState("win")
          } else {
            switchTurn()
          }
          return
        }

        currentAnimatedPos += targetPosition > currentAnimatedPos ? 1 : -1

        if (player === "red") setRedPosition(currentAnimatedPos)
        else setBluePosition(currentAnimatedPos)

        setTimeout(step, 300)
      }
      step()
    },
    [boardPath.length, switchTurn],
  )

  const handleTaskComplete = (isCompleted: boolean) => {
    if (!currentTask || !translations) return

    const activePlayer = currentTask.executor
    const currentPosition = activePlayer === "red" ? redPosition : bluePosition
    const maxPosition = boardPath.length - 1
    let finalPosition = currentPosition
    let toastMessage = ""
    let toastType: "success" | "error" = "success"

    if (taskType === "star" || taskType === "trap") {
      const rewardSteps = Math.floor(Math.random() * 4) // 0-3格
      const penaltySteps = Math.floor(Math.random() * 4) + 3 // 3-6格

      if (isCompleted) {
        let newPosition = currentPosition + rewardSteps
        // 处理超出终点的反弹
        if (newPosition > maxPosition) {
          const overshoot = newPosition - maxPosition
          newPosition = maxPosition - overshoot
          newPosition = Math.max(0, newPosition)
        }
        finalPosition = newPosition

        if (rewardSteps === 0) {
          toastMessage = activePlayer === "red" ? translations.toast.redStay : translations.toast.blueStay
        } else {
          const template = activePlayer === "red" ? translations.toast.redForward : translations.toast.blueForward
          toastMessage = interpolate(template, { steps: rewardSteps.toString() })
        }
        toastType = "success"
      } else {
        finalPosition = Math.max(currentPosition - penaltySteps, 0)
        const template = activePlayer === "red" ? translations.toast.redBackward : translations.toast.blueBackward
        toastMessage = interpolate(template, { steps: penaltySteps.toString() })
        toastType = "error"
      }
    } else if (taskType === "collision") {
      const executorPlayer = currentTask.executor
      if (!isCompleted) {
        if (executorPlayer === "red") {
          setRedPosition(0)
          toastMessage = translations.toast.redFailedToStart
        } else {
          setBluePosition(0)
          toastMessage = translations.toast.blueFailedToStart
        }
        toastType = "error"
        setCurrentTask(null)
        setTaskType(null)
        setToast({ message: toastMessage, type: toastType })
        setTimeout(() => setToast(null), 3000)
        setGameState("playing")
        switchTurn()
        return
      } else {
        toastMessage = executorPlayer === "red" ? translations.toast.redCompleted : translations.toast.blueCompleted
        toastType = "success"
        setCurrentTask(null)
        setTaskType(null)
        setToast({ message: toastMessage, type: toastType })
        setTimeout(() => setToast(null), 3000)
        setGameState("playing")
        switchTurn()
        return
      }
    }

    setToast({ message: toastMessage, type: toastType })
    setTimeout(() => setToast(null), 3000)

    if (finalPosition !== currentPosition && (taskType === "star" || taskType === "trap")) {
      animateTaskOutcomeMove(finalPosition, activePlayer, currentPosition)
    } else {
      setCurrentTask(null)
      setTaskType(null)
      setGameState("playing")
      // 只有正好到达终点才获胜
      if (finalPosition === maxPosition && (taskType === "star" || taskType === "trap")) {
        setWinner(activePlayer)
        setGameState("win")
      } else {
        switchTurn()
      }
    }
  }

  const startGame = async (mode: GameMode) => {
    setGameMode(mode)
    await loadTasks(mode, language)

    const newPath = createBoardPath()
    setBoardPath(newPath)

    setGameState("playing")
    setRedPosition(0)
    setBluePosition(0)
    setCurrentPlayer("red")
    setDiceValue(null)
    setWinner(null)
    setIsMoving(false)
    setIsRolling(false)
  }

  const restartGame = () => {
    setGameState("start")
  }

  const handleLanguageChange = async (newLanguage: Language) => {
    setLanguage(newLanguage)
    // Reload tasks if game is in progress
    if (gameState !== "start" && gameMode) {
      await loadTasks(gameMode, newLanguage)
    }
  }

  const renderBoard = () => {
    if (!translations) return null

    const boardGridSize = 7
    const cells = []
    const cellElements: { [key: string]: JSX.Element } = {}

    boardPath.forEach((pathCell) => {
      const isRedOnCell = redPosition === pathCell.id
      const isBlueOnCell = bluePosition === pathCell.id
      const areBothOnCell = isRedOnCell && isBlueOnCell
      const playerIconSize = areBothOnCell ? 18 : 24

      cellElements[`${pathCell.y}-${pathCell.x}`] = (
        <div key={`${pathCell.y}-${pathCell.x}`} className={`cell ${pathCell.type}`}>
          <div className="cell-number">{pathCell.id}</div>
          {pathCell.type === "start" && (
            <div className="cell-icon-text">
              <Rocket size={18} /> <p>{translations.board.start}</p>
            </div>
          )}
          {pathCell.type === "end" && (
            <div className="cell-icon-text">
              <Trophy size={18} /> <p>{translations.board.end}</p>
            </div>
          )}
          {pathCell.type === "star" && (
            <div className="cell-icon-text">
              <Star size={16} /> <p>{translations.board.star}</p>
            </div>
          )}
          {pathCell.type === "trap" && (
            <div className="cell-icon-text">
              <Bomb size={16} /> <p>{translations.board.trap}</p>
            </div>
          )}
          {pathCell.type === "path" && <div className="cell-icon-text">•</div>}

          {isRedOnCell && (
            <div
              className={`player red ${currentPlayer === "red" ? "current-turn" : ""} ${areBothOnCell ? "stacked" : ""} ${isMoving && currentPlayer === "red" ? "moving" : ""}`}
            >
              <Plane size={playerIconSize} />
            </div>
          )}
          {isBlueOnCell && (
            <div
              className={`player blue ${currentPlayer === "blue" ? "current-turn" : ""} ${areBothOnCell ? "stacked" : ""} ${isMoving && currentPlayer === "blue" ? "moving" : ""}`}
            >
              <Helicopter size={playerIconSize} />
            </div>
          )}
        </div>
      )
    })

    for (let r = 0; r < boardGridSize; r++) {
      for (let c = 0; c < boardGridSize; c++) {
        if (cellElements[`${r}-${c}`]) {
          cells.push(cellElements[`${r}-${c}`])
        } else {
          cells.push(<div key={`${r}-${c}`} className="cell empty"></div>)
        }
      }
    }
    return cells
  }

  const renderPathLines = () => {
    if (!boardPath || boardPath.length === 0) return null
    const lines = []
    const cellSize = 100 / 7

    for (let i = 0; i < boardPath.length - 1; i++) {
      const current = boardPath[i]
      const next = boardPath[i + 1]
      const startX = (current.x + 0.5) * cellSize
      const startY = (current.y + 0.5) * cellSize
      const endX = (next.x + 0.5) * cellSize
      const endY = (next.y + 0.5) * cellSize
      const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
      const angle = (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI
      const centerX = (startX + endX) / 2
      const centerY = (startY + endY) / 2
      lines.push(
        <div
          key={`line-${i}`}
          className="path-line"
          style={{
            width: `${length}%`,
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            top: `${centerY}%`,
            left: `${centerX}%`,
          }}
        />,
      )
    }
    return lines
  }

  if (!translations) {
    return (
      <div className="game-container start-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (gameState === "start") {
    return (
      <div className="game-container start-container">
        <div className="start-header">
          <div className="start-header-content">
            <div className="game-logo">
              <div className="main-title-area">
                <div className="game-title-main">{translations.game.title}</div>
                <div className="game-subtitle-main">{translations.game.subtitle}</div>
                <div className="title-language-selector">
                  <LanguageSelector 
                    currentLanguage={language} 
                    onLanguageChange={handleLanguageChange} 
                    showGithub={true}
                    className="title"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="start-content">
          <div className="welcome-section">
            <h2 className="welcome-title">{translations.game.selectMode}</h2>
            <p className="welcome-description">{translations.game.modeDescription}</p>
          </div>

          <div className="modes-grid">
            {Object.entries(translations.modes).map(([key, mode]) => {
              const IconComponent = gameModeIcons[key as GameMode]
              return (
                <div
                  key={key}
                  className={`mode-card ${key === "intimate" ? "intimate-card" : ""}`}
                  onClick={() => !isLoadingTasks && startGame(key as GameMode)}
                >
                  <div className={`mode-gradient bg-gradient-to-br ${gameModeColors[key as GameMode]}`}>
                    <div className="mode-icon-container">
                      <IconComponent size={24} className="mode-icon" />
                      <span className="mode-emoji">{gameModeEmojis[key as GameMode]}</span>
                    </div>
                  </div>

                  <div className="mode-info">
                    <h3 className="mode-title">{mode.name}</h3>
                    <p className="mode-desc">{mode.description}</p>

                    {isLoadingTasks && gameMode === key && (
                      <div className="loading-indicator">
                        <div className="loading-spinner"></div>
                        <span>{translations.common.loading}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="game-tips">
            <div className="tip-item">
              <Users size={18} />
              <span>{translations.tips.twoPlayers}</span>
            </div>
            <div className="tip-item">
              <Heart size={18} />
              <span>{translations.tips.faceToFace}</span>
            </div>
            <div className="tip-item">
              <Sparkles size={18} />
              <span>{translations.tips.improveRelation}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`game-container ${currentPlayer}-turn`}>
      <div className={`header ${currentPlayer}-turn`}>
        <button className="back-button" onClick={restartGame} title={translations.game.backToHome}>
          <ArrowLeft size={20} />
        </button>
        <span className="header-title">
          {translations.game.title} - {translations.modes[gameMode].name}
        </span>
        <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
      </div>
      <div className="content">
        <div className={`turn-indicator ${currentPlayer}`}>
          {currentPlayer === "red" ? translations.game.redTurn : translations.game.blueTurn}
        </div>
        <div className={`dice-area ${currentPlayer}-turn`}>
          <div className={`dice ${currentPlayer}-turn`}>{diceValue ?? "?"}</div>
          <button
            className={`button ${currentPlayer === "blue" ? "blue" : ""}`}
            onClick={rollDice}
            disabled={isRolling || isMoving || gameState === "task" || isLoadingTasks}
          >
            {isMoving
              ? translations.common.moving
              : isRolling
                ? translations.common.rolling
                : isLoadingTasks
                  ? translations.common.preparing
                  : translations.common.rollDice}
          </button>
        </div>
        <div className="board-container">
          <div className="board">{renderBoard()}</div>
          <div className="path-lines-container">{renderPathLines()}</div>
        </div>
      </div>

      {gameState === "task" && currentTask && (
        <div className="modal">
          <div className="modal-content">
            <h2>{translations.tasks.challenge}</h2>
            <div className={`task-card ${currentTask.executor}-executor`}>
              <div className="task-title">
                {taskType === "star"
                  ? translations.tasks.starTask
                  : taskType === "trap"
                    ? translations.tasks.trapTask
                    : translations.tasks.collisionTask}
              </div>
              <div className={`executor ${currentTask.executor}`}>
                {currentTask.executor === "red" ? translations.tasks.redExecute : translations.tasks.blueExecute}
              </div>
              <div className="task-description">{currentTask.description}</div>
              <div className="task-rewards">
                {taskType === "star" && (
                  <div className="reward-info">
                    <div className="reward-success">{translations.tasks.completedReward}</div>
                    <div className="reward-fail">{translations.tasks.failedPenalty}</div>
                  </div>
                )}
                {taskType === "trap" && (
                  <div className="reward-info">
                    <div className="reward-success">{translations.tasks.completedReward}</div>
                    <div className="reward-fail">{translations.tasks.failedPenalty}</div>
                  </div>
                )}
                {taskType === "collision" && (
                  <div className="reward-info">
                    <div className="reward-success">{translations.tasks.collisionCompletedReward}</div>
                    <div className="reward-fail">{translations.tasks.collisionFailedPenalty}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="task-buttons">
              <button className="task-button complete-btn" onClick={() => handleTaskComplete(true)}>
                ✅ {translations.common.completed}
              </button>
              <button className="task-button fail-btn" onClick={() => handleTaskComplete(false)}>
                ❌ {translations.common.failed}
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === "win" && winner && (
        <div className="modal win-modal">
          <div className="win-card">
            <div className="win-celebration">
              <div className="confetti-container">
                <div className="confetti"></div>
                <div className="confetti"></div>
                <div className="confetti"></div>
                <div className="confetti"></div>
                <div className="confetti"></div>
              </div>
              <div className="trophy-icon">
                <Trophy size={60} />
              </div>
              <h1 className="win-title">
                🎉 {winner === "red" ? translations.game.redWin : translations.game.blueWin} 🎉
              </h1>
              <p className="win-subtitle">{translations.game.selectWinTask || "选择一个胜利任务来庆祝吧！"}</p>
            </div>
            
            <div className="win-tasks-container">
              <h3 className="tasks-title">{translations.game.winTasksTitle || "胜利任务选择"}</h3>
              <div className="win-tasks-grid">
                {winTaskOptions.map((task, index) => (
                  <div
                    key={task.id}
                    className={`win-task-card ${winner}-winner`}
                    onClick={() => handleWinTaskSelect(task)}
                  >
                    <div className="task-number">{index + 1}</div>
                    <div className="task-content">
                      <Sparkles size={20} />
                      <p>{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="win-actions">
              <button className="skip-button" onClick={restartFromWin}>
                <ArrowLeft size={16} />
                {translations.common.skipToHome || "跳过回到首页"}
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === "winTask" && selectedWinTask && winner && (
        <div className="modal win-task-modal">
          <div className="win-task-execution-card">
            <div className="task-header">
              <Star size={32} className="task-star" />
              <h2>{translations.game.winTaskExecution || "胜利任务执行"}</h2>
            </div>
            
            <div className={`selected-task ${winner}-executor`}>
              <div className="task-executor">
                {winner === "red" ? translations.tasks.redExecute : translations.tasks.blueExecute}
              </div>
              <div className="task-description-box">
                {selectedWinTask.description}
              </div>
            </div>
            
            <div className="celebration-message">
              <Heart size={24} />
              <p>{translations.game.celebrationMessage || "完成这个任务来庆祝你们的胜利！"}</p>
            </div>
            
            <div className="win-task-actions">
              <button 
                className="complete-win-task-btn"
                onClick={handleWinTaskComplete}
              >
                ✅ {translations.common.completed}
              </button>
              <button 
                className="restart-btn"
                onClick={restartFromWin}
              >
                <RotateCcw size={16} />
                {translations.common.restart}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}
