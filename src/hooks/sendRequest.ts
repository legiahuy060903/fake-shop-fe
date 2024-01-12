
export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = props;

    const options: any = {
        method: method || "GET",
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";


    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? "",
                    success: json?.success
                } as T;
            });
        }
    });
};
