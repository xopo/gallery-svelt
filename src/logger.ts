import fs from 'fs';
import path from 'path';
import conf from './WS/API/envData';

const logFile = path.join(conf.cwd, 'static/logs/backend.log');

export const logStream = fs.createWriteStream(logFile, {flags: 'a'});

export const log = (line: Object): void => {
    const newLine = typeof line === 'string' ? line : JSON.stringify(line, null, 2);
    
    logStream.write(`${newLine}\n`);
}
