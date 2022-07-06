export const whenPatternMatches = (string: string, patterns: Array<[RegExp, Function]>) => {
    const foundPattern = patterns.find(([pattern]) => pattern.exec(string));

    if (foundPattern) {
        const [, effect] = foundPattern;
        effect();
    }
}