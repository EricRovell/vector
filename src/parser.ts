import { parseCartesian, parseCartesianArgs, parseCartesianTuple, parseCylindrical, parsePolar } from "./parsers";
import { isCartesian, isCartesianTuple, isCylindrical, isPolar, isValidNumber } from "./validators";
import type { ParseOutput, VectorInput } from "./types";

/**
 * The order is important!
 *
 * The cylindrical interface has intersection with cartesian - `z`,
 * and with spherical - `phi`, that's why all properties there are required
 * and that's why it is above cartesian and spherical.
 *
 * Cartesian and spherical have no intersection, so all properties are optional.
 */

/**
 * Parses input into Cartesian Tuple.
 */
export function parse(x?: VectorInput | number, y?: number, z?: number): ParseOutput {
	if (typeof x === "undefined") {
		return {
			input: undefined,
			output: [ 0, 0, 0 ],
			valid: true
		};
	}

	if (isValidNumber(x)) {
		return parseCartesianArgs(x, y, z);
	}

	if (isCartesianTuple(x)) {
		return parseCartesianTuple(x);
	}

	if (isCylindrical(x)) {
		return parseCylindrical(x);
	}

	if (isPolar(x)) {
		return parsePolar(x);
	}

	if (isCartesian(x)) {
		return parseCartesian(x);
	}

	return {
		input: x,
		output: [ 0, 0, 0 ],
		valid: false
	};
}
