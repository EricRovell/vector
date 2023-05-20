import { isObject, validateNumbers } from "../utils";
import type { Cartesian, Polar, CartesianTuple, Cylindrical } from "../types";

export const isCartesian = (input: unknown): input is Cartesian => {
	if (!isObject(input)) {
		return false;
	}

	return ([ "x", "y", "z" ]
		.some(key => key in input));
};

export const isPolar = (input: unknown): input is Polar => {
	if (!isObject(input)) {
		return false;
	}

	return [ "phi", "theta" ]
		.some(key => key in input);
};

export const isCartesianTuple = (input: unknown): input is CartesianTuple => {
	if (!Array.isArray(input) || input.length < 1 || input.length > 3) {
		return false;
	}

	return validateNumbers(...input);
};

export const isCylindrical = (input: unknown): input is Cylindrical => {
	if (!isObject(input)) {
		return false;
	}

	return [ "p", "phi", "z" ]
		.every(key => key in input);
};
