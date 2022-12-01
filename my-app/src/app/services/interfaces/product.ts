export interface IProduct {
    _id: string,
    title: string,
    description: string,
    images: object[],
    category: string,
    author: string,
    email: string,
    likes: string[],
    comments: string[],
    visible: boolean,
}