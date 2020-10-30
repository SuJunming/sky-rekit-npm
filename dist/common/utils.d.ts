export declare const success: (data?: {
    children: any[];
    name: string;
    type: number;
    path: string;
}[] | undefined) => {
    code: number;
    status: string;
    data: {
        children: any[];
        name: string;
        type: number;
        path: string;
    }[] | null;
};
export declare const handleUrl: (url: string) => string;
export declare const toLowerLine: (str: string) => string;
export declare const readFileToArr: (fReadName: any, callback: any) => void;
