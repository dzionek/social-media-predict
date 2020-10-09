/**
 * Common types used by components.
 */

export type Platform = "YouTube" | "Twitch" | "Twitter"

export interface Response {
    doesExist: boolean,
    insignificant?: boolean,
    username?: string,
    picture?: string,
    dates?: string[],
    subscribers?: number[],
    r?: number,
    predicted?: [string, number][]
}