import { parsers } from "./parsers";
import type { InputUser, Parser } from "../types";

/**
 * Parses input into Ratio.
 *
 * Supported input:
 *  + parse({ x, y, z });
 *  + parse([ x, y, z ]);
 */
export const parse: Parser<InputUser | undefined> = (input) => {
	if (typeof input === "undefined") {
		return [ 0, 0, 0 ];
	}

	for (const parser of parsers) {
		const parsed = parser(input);
		if (parsed) {
			return parsed;
		}
	}

	return null;
};
