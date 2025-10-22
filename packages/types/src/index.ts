export interface User { id: string; wallet?: string; email?: string; }
export interface GameResult { id: string; winnerId: string; createdAt: string; }
export interface PricePoint { t: number; v: number; }