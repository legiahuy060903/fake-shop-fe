export { }
declare global {
    interface IRequest {
        url: string;
        method?: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }
    interface ICategory {
        name: string,
        block: boolean,
        id: number,
        createdAt: Date
        updatedAt: Date
    }
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        success: boolean;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        data: T
    }

}