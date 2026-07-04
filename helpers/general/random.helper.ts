/**
 * Returns a random integer
 * @param min Minimum number
 * @param max Maximum number
 * @returns Random integer 0 (inclusive) - max (exclusive)
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}