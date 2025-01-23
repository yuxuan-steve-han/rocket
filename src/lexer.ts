export enum TokenType {
    Number,
    Idetifier,
    Equals,
    BinaryOperator,
    OpenParen,
    CloseParen,
    Let,
}

export interface Token {
    type: TokenType;
    value: string;
}

export const keywords: Record<string, TokenType> = {
    let: TokenType.Let,
};

function token(type: TokenType, value: string): Token {
    return { type, value };
}

function skippable(char: string): boolean {
    return char === " " || char === "\n" || char === "\t";
}

function isInt(char: string): boolean {
    return char >= "0" && char <= "9";
}

function isAlpha(char: string): boolean {
    return char >= "a" && char <= "z";
}

export function tokenize(sourceCode: string): Token[] {
    const tokens: Token[] = [];
    const src = sourceCode.split("");

    while(src.length > 0) {
        if(src[0] === "(") {
            tokens.push(token(TokenType.OpenParen, src.shift()!));
        } else if(src[0] === ")") {
            tokens.push(token(TokenType.CloseParen, src.shift()!));
        } else if(src[0] === "=") {
            tokens.push(token(TokenType.Equals, src.shift()!));
        } else if(src[0] === "+" || src[0] === "-" || src[0] === "*" || src[0] === "/") {
            tokens.push(token(TokenType.BinaryOperator, src.shift()!));
        } else if(isInt(src[0])) {
            let digits = "";
            while(isInt(src[0])) {
                digits += src.shift();
            }
            tokens.push(token(TokenType.Number, digits));
        } else if(skippable(src[0])) {
            src.shift();
        } else if(isAlpha(src[0])) {
            let id = "";
            while(isAlpha(src[0])) {
                id += src.shift();
            }
            if(id in keywords) {
                tokens.push(token(keywords[id], id));
            } else {
                tokens.push(token(TokenType.Idetifier, id));
            }
        }
    }

    return tokens;
}