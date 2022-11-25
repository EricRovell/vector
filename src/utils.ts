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
