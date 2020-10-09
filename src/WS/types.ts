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

export interface WebSock {
    close: () => null,
    init: () => null,
    send: (data) => null,
    content: any,
    logEntry: any,
    tasks: any
}