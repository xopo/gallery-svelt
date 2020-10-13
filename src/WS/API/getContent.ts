import fs, { promises as afs } from 'fs';
import path from 'path';
import confg from './envData';
import { log } from '../../logger';
import sharp from 'sharp';
import type { Content } from '../types';


// export const galleryPath = imagesPath;
const acceptedFileType = ['jpg', 'gif', 'jpeg'];

const fileAccepted = (fileName: string): boolean => {
    const ext = fileName.split('.').reverse()[0];
    for (let i = 0; i < acceptedFileType.length; i++) {
        if (acceptedFileType[i] === ext.toLowerCase()) return true;
    }
    return false;
}

export const cacheDir = path.resolve('static', 'cached', 'images');

export const getContent = async (fromFolder:string): Promise<Content> => {
    const basePath = fromFolder ?? '/';
    const sourcePath = path.join(confg.IMAGESOURCE, basePath);

    const content:Content = { 
        folders: [], 
        images: [],
        basePath: basePath === '/' ? '/' : `${basePath}/`,
        count: {
            folders: 0,
            images: 0
        }
    };
    const data = await afs.readdir(sourcePath, {encoding: 'utf8', withFileTypes: true});
    for (let i=0; i < data.length; i++) {
        if(data[i].isDirectory()) {
            content.folders.push(await checkAndCreateFolder(data[i].name, basePath));
        } else if (data[i].isFile() && fileAccepted(data[i].name)) {
            content.images.push(data[i].name);
            // content.images.push(await checkAndCreateImage(data[i].name, basePath, sourcePath));
        }
    }
    content.count.folders = content.folders.length;
    content.count.images = content.images.length;
    return content;
}

const checkAndCreateFolder = async (dir: string, basePath: string): Promise<string> => {
    const target = path.join(cacheDir, basePath, dir);
    fs.access(target,null,  (err): void => {
        if (err && err.code === 'ENOENT') {
            try {
                afs.mkdir(target);
            } catch(er) {
                log(er);
            }
        }
    });
    return dir;
}

export const getThumbNailImage = async (img: string, basePath: string) => {
    const sourcePath = path.join(confg.IMAGESOURCE, basePath);
    return await checkAndCreateImage(img, basePath, sourcePath);
}

const checkAndCreateImage = async (img: string, basePath, source: string): Promise<string> => {
    const input = path.join(source, img);
    const ext = img.split('.').reverse()[0];
    const thumb = img.replace(ext, `thumb.${ext}`);
    const output = path.join(cacheDir, basePath, thumb);
    try {
        await afs.access(output)
    } catch (er) {
        await sharp(input)
            .rotate()
            .resize(300)
            .toFile(output);
    }
    
    return thumb;
}