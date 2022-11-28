/**
 * Clamps a value between an upper and lower bound.
 * NaN is clamped to the lower bound
 */
export const clamp = (number: number, min = 0, max = 1): number => {
	return Math.min(Math.max(number, min), max);
};

/**
	* Multiplier to convert degrees into radians.
	*/
export const deg2rad = Math.PI / 180;

export const isObject = <T = Record<string, unknown>>(input: unknown): input is T => {
	return typeof input === "object"
		&& !Array.isArray(input)
		&& input !== null;
};

/**
 * Multiplier to convert radians into degrees.
 */
export const rad2deg = 180 / Math.PI;

/**
 * Round the number up to the desired precision.
 */
export function round(number: number, digits = 0, base = Math.pow(10, digits)): number {
	return Math.round(number * base) / base + 0;
}

/**
 * Validates numbers input.
 */
export const validateNumbers = (...items: unknown[]) => {
	return items.every(item => typeof item === "number" && !Number.isNaN(item));
};

/**
 * Converts the angle in radians to degrees if specified.
 */
export const convertAngle = (value: number, degrees = false) => {
	return degrees
		? value * rad2deg
		: value;
};
