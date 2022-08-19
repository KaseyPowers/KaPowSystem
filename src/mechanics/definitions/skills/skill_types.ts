import { BaseStat } from "../base_stats";


export interface Skill extends BaseStat {
    /** Measure the level of investment in a skill */
    level: number
}