"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configMorgan = void 0;
const morgan = require("morgan");
const morgan_constants_1 = require("./morgan.constants");
exports.configMorgan = {
    appendMorganToken: (token, tokenType, morganToken) => morgan.token(morganToken, (req, res) => {
        if (tokenType === morgan_constants_1.TOKEN_TYPE.Request)
            return req[token];
        else
            return res[token];
    }),
};
//# sourceMappingURL=morgan.config.js.map