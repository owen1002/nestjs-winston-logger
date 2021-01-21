"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MORGAN_FORMAT_STRING = exports.TOKEN_TYPE = void 0;
var TOKEN_TYPE;
(function (TOKEN_TYPE) {
    TOKEN_TYPE[TOKEN_TYPE["Request"] = 0] = "Request";
    TOKEN_TYPE[TOKEN_TYPE["Response"] = 1] = "Response";
})(TOKEN_TYPE = exports.TOKEN_TYPE || (exports.TOKEN_TYPE = {}));
exports.MORGAN_FORMAT_STRING = {
    REQUEST: `[:date[iso]] request-url::url :remote-addr ":method  HTTP/:http-version"`,
    RESPONSE: `[:date[iso]] content-length::res[content-length] total-time::total-time[3]ms`,
};
//# sourceMappingURL=morgan.constants.js.map