import { parsers } from "./parsers";
import type { CartesianTuple, UserInput } from "../types";
import { validateNumbers } from "../utils";

type Parser = (x?: UserInput | number, y?: number, z?: number) => CartesianTuple | null;

/**
 * Parses input into CartesianTupe.
 *
 * Supported input:
 *  + parse(x, y, z);
 *  + parse({ x, y, z });
 *  + parse([ x, y, z ]);
 *  + parse({ degrees?, phi?, theta?, magnitude? });
 */
export const parse: Parser = (x, y = 0, z = 0) => {
	if (typeof x === "undefined") {
		return [ 0, 0, 0 ];
	}

	if (typeof x === "number") {
		if (validateNumbers(x, y, z)) {
			return [ x, y, z ];
		}
	} else {
		for (const parser of parsers) {
			const parsed = parser(x);
			if (parsed) {
				return parsed;
			}
		}
	}

	return null;
};
