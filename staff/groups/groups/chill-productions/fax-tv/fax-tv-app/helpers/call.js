function call(method, token, url, body, callback) {debugger
    let headers = {}

    if (token) headers['Authorization'] = `Bearer ${token}`
    if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'

    fetch(method, url, headers, body, function (response) {
        if (response.readyState == 4) {
            const result = JSON.parse(response.responseText);

            callback(result);
        }
    });
}