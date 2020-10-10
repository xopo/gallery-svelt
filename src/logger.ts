import fs from 'fs';
import { wsLog } from './server';

const logFile = './static/logs/backend.log';

export const logStream = fs.createWriteStream(logFile, {flags: 'a'});

export const log = (line) => {
    const newLine = typeof line === 'string' ? line : JSON.stringify(line, null, 2);
    wsLog(newLine);
    
    logStream.write(`${newLine}\n`);
}
