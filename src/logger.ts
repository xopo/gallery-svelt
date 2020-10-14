import fs from 'fs';

const logFile = 'static/logs/backend.log';

export const logStream = fs.createWriteStream(logFile, {flags: 'a'});

export const log = (line: Object): void => {
    const newLine = typeof line === 'string' ? line : JSON.stringify(line, null, 2);
    
    logStream.write(`${newLine}\n`);
}
