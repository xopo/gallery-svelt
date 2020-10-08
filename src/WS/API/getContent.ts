import { promises as fs } from 'fs';

export const galleryPath = '/Users/dratiu/Downloads/gallery';
const acceptedFileType = ['jpg', 'gif', 'jpeg'];

const fileAccepted = fileName => {
    const ext = fileName.split('.').reverse()[0];
    for (let i = 0; i < acceptedFileType.length; i++) {
        if (acceptedFileType[i] === ext.toLowerCase()) return true;
    }
    return false;
}

export const getContent = async (path:string = galleryPath) => {
    const content = { folders: [], images: []};
    const data = await fs.readdir(path, {encoding: 'utf8', withFileTypes: true});
    for (let i=0; i < data.length; i++) {
        if(data[i].isDirectory()) {
            content.folders.push(data[i].name);
        } else if (data[i].isFile() && fileAccepted(data[i].name)) {
            content.images.push(data[i].name);
        }
    }
    return content;
}