export const whenPatternMatches = (string: string, patterns: Array<[RegExp, Function]>) => {
    const foundPattern = patterns.find(([pattern]) => pattern.exec(string));

    if (foundPattern) {
        const [, effect] = foundPattern;
        effect();
    }
}

export const getNameById = (id: number, names: Array<{ id: number, name: string }>) => {
    const foundName = names.find(({ id: nameId }) => nameId === id);

    if (foundName) {
        return foundName.name;
    }

    return '';
}

export const getUserNameById = (id: number, members: Array<{ id: number, firstname: string, lastname: string }>) => {
    const foundName = members.find(({ id: nameId }) => nameId === id);

    if (foundName) {
        return `${foundName.firstname} ${foundName.lastname}`;
    }

    return '';
}

//lodash