import { DEG } from "./consts";

/**
 * Round the number up to the desired precision.
 */
export function ceil(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.ceil(number * base) / base + 0;
}

/**
 * Converts the angle in radians to degrees if specified.
 */
export const convertAngle = (value: number, degrees = false) => {
	return degrees
		? value * DEG
		: value;
};

/**
 * Clamps a value between an upper and lower bound.
 * NaN is clamped to the lower bound
 */
export const clamp = (number: number, min = 0, max = 1): number => {
	return Math.min(Math.max(number, min), max);
};

/**
 * Round the number up to the desired precision.
 */
export function floor(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.floor(number * base) / base + 0;
}

/**
 * Round the number up to the desired precision.
 */
export function round(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.round(number * base) / base + 0;
}
