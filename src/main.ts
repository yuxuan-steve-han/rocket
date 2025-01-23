import { tokenize } from "./lexer";

const sourceCode = "hello 15 + 2 = ()";
const tokens = tokenize(sourceCode);
console.log(tokens);