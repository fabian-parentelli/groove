const logger = async ({ error, route, user = 'anonymous', context = null }) => {
    const stack = getStack(error)
    const { func, file, line, column } = stack || {};
    const obj = {
        level: error.level || 'error',
        message: error.message,
        func, file, line, column, route, user, context
    };
    printColoredObject(obj.level, obj);
    
    // Función que guarda en bd

};

export { logger };

function getStack(error) {
    const lines = error.stack.split('\n');
    const relevantLine = lines.find(line => line.includes('/src/'));
    if (!relevantLine) return;
    const match = relevantLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/);
    if (!match) return;
    const [, func, file, lineNum, column] = match;
    const srcIndex = file.indexOf('/src/');
    const relativeFile = file.substring(srcIndex);
    return { func, file: relativeFile, line: Number(lineNum), column: Number(column) };
};

function printColoredObject(label, obj) {
    let colorCode = '\x1b[37m';
    if (obj.level === 'error') colorCode = '\x1b[31m';
    else if (obj.level === 'warn') colorCode = '\x1b[33m';
    else if (obj.level === 'info') colorCode = '\x1b[34m';

    console.log(`${label}: {`);
    Object.entries(obj).forEach(([key, value]) => {
        console.log(`  ${key}: ${colorCode}${value}\x1b[0m`);
    });
    console.log('}');
};

// logger({ error, route: req.originalUrl, user: req.user._id });