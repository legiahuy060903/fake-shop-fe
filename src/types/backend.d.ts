export { }
declare global {

    interface IRequest {
        url: string;
        method?: string;
        body?: { [key: string]: any };
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

    interface IProduct {
        id: number
        name: string;
        description: string;
        thumbnail: string;
        slug: string;
        public: boolean;
        publish_date: Date;
        author: string;
        number_of_page: number;
        amount: number;
        sold: number;
        rating: number;
        price: number;
        category: ICategory;
        view: number;
        images: Images;
        slides: string[];
        createdAt: Date;
        updatedAt: Date;
    }
    interface Images {
        id: number, url: string
    }[]
    interface IUser {
        id: number,
        username: string | null,
        email: string,
        phone: string | null,
        type: string | null,
        avatar: string | null,
        address: string | null,
        role: string,
        gender: string
    }
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        success: boolean;
        data?: T;
        meta?: {
            _page?: number;
            _limit?: number;
            total?: number;
        }
    }

}