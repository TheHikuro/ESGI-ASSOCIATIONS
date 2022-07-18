module.exports= {
    stringFormat: (str, ...args) => {
        let i = 0;
        return str.replace(/%s/g, () => args[i++]);
    }
}