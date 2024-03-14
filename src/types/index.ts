export interface ConfigData {
  games: GameData[]
  logo?: string
  name?: string
}

export type GameIdType = string | number

export interface GameData {
  id: GameIdType // 游戏ID
  name: string // 游戏名称
  gameUrl: string // 游戏启动地址
  bgUrl: string // 游戏背景
  iconUrl: string // 游戏图标
  createTime: number // 添加时间
  index: number // 游戏排序
  uptime?: number // 游戏时长
  running?: boolean // 运行中
}
