import { Point } from "./types";

/**
 * Capitalize the first letter of a word
 * @param str Word to be capitalized
 */
export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Check if n is in the range (min, max)
 * @param n The number to check
 * @param min Minimum value of the range
 * @param max Maximum value of the range
 */
export const isInRange = (n: number, min: number, max: number): boolean => min < n && n < max

/**
 * Find distance between two points
 * @param point1 @type Point
 * @param point2 @type Point
 */
export const distance = (point1: Point, point2: Point): number => {
    let xDistance = point1.x - point2.x;
    let yDistance = point1.y - point2.y;
    
    return Math.sqrt(yDistance ** 2 + xDistance ** 2);
}