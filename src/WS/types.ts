export interface Task {
    id: string,
    v: string,
    c?: boolean
}

export interface Content {
    folders: Array<string>,
    images: Array<string>,
    basePath: string,
    count?: {
        folders: number,
        images: number
    }
}