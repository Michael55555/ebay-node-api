export declare const getRequest: (url: string) => Promise<string>;
export declare const makeRequest: ({ self, endpoint, methodName, token }: {
    self: any;
    endpoint: string;
    methodName: string;
    token: string;
}) => Promise<string>;
