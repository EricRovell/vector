import type { Cartesian, CartesianTuple, Cylindrical, Polar } from ".";

export function isCartesian(input: unknown): input is Cartesian {
	if (!isObject(input)) {
		return false;
	}

	return (
		Object.hasOwn(input, "x") ||
		Object.hasOwn(input, "y") ||
		Object.hasOwn(input, "z")
	);
}

export function isCartesianTuple(input: unknown): input is CartesianTuple {
	if (!Array.isArray(input) || input.length < 1 || input.length > 3) {
		return false;
	}

	const [ x = 0, y = 0, z = 0 ] = input;

	return (
		isValidNumber(x) &&
		isValidNumber(y) &&
		isValidNumber(z)
	);
}

export function isCylindrical(input: unknown): input is Cylindrical {
	if (!isObject(input)) {
		return false;
	}

	if (!isValidNumber(input.p) || !isValidNumber(input.phi) || !isValidNumber(input.z)) {
		return false;
	}

	return (
		Object.hasOwn(input, "p") &&
		Object.hasOwn(input, "phi") &&
		Object.hasOwn(input, "z")
	);
}

export function isNullable(value: unknown): value is null | undefined {
	return value === null || typeof value === "undefined";
}

export function isObject<T = Record<string, unknown>>(input: unknown): input is T {
	return (
		typeof input === "object" &&
		!Array.isArray(input) &&
		input !== null
	);
}

export function isPolar(input: unknown): input is Polar {
	if (!isObject(input)) {
		return false;
	}

	if (!isNullable(input.phi) && !isValidNumber(input.phi)) {
		return false;
	}

	if (!isNullable(input.theta) && !isValidNumber(input.theta)) {
		return false;
	}

	return (
		Object.hasOwn(input, "phi") ||
		Object.hasOwn(input, "theta")
	);
}

export function isValidNumber(value: unknown): value is number {
	return typeof value === "number" && !Number.isNaN(value);
}
