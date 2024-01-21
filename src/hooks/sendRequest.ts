

export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        headers = {},
        nextOption = {},
        token
    } = props;

    if (token) headers["Authorization"] = `Bearer ${token}`;
    const options: any = {
        method: method || "GET",
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
    };
    if (token) options.credentials = "include";

    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then(function (json) {
                alert(json?.message)
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
