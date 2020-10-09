import { promises as fs } from 'fs';
import path from 'path';
import type { Content } from '../types';
import { log } from '../../logger';

export const galleryPath = '/Users/dratiu/Downloads/gallery';
const acceptedFileType = ['jpg', 'gif', 'jpeg'];

const fileAccepted = fileName => {
    const ext = fileName.split('.').reverse()[0];
    for (let i = 0; i < acceptedFileType.length; i++) {
        if (acceptedFileType[i] === ext.toLowerCase()) return true;
    }
    return false;
}

export const getContent = async (fromFolder:string) => {
    const basePath = fromFolder ?? '/';
    const gPath = path.join(galleryPath, basePath);
    log({basePath, gPath});

    const content:Content = { 
        folders: [], 
        images: [],
        basePath: basePath === '/' ? '/' : `${basePath}/`,
        count: {
            folders: 0,
            images: 0
        }
    };
    const data = await fs.readdir(gPath, {encoding: 'utf8', withFileTypes: true});
    for (let i=0; i < data.length; i++) {
        if(data[i].isDirectory()) {
            content.folders.push(data[i].name);
        } else if (data[i].isFile() && fileAccepted(data[i].name)) {
            content.images.push(data[i].name);
        }
    }
    content.count.folders = content.folders.length;
    content.count.images = content.images.length;

    return content;
}