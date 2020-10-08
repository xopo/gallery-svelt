
export const setMessage = (entry, beautyfy = false):string => beautyfy ? JSON.stringify(entry, null, 2) : JSON.stringify(entry);

export const getMessage = (entry:string) =>  JSON.parse(entry) ;


