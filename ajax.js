function publicGetData(params, url, success, error) {
    $(".loading").show();
    var userToken = localStorage.getItem("xb_token");
    if ((!userToken || userToken == 'null' || userToken == undefined) && params != 'getToken') {
        localStorage.removeItem("xb_token");
        badToken(params, url, success);
        return false;
    }

    $.ajax({
        headers: {
            "token": userToken
        },
        'url': url,
        'data': params,
        'type': 'POST',
        'dataType': 'json',
        success: function (res) {
            $(".loading").hide();
            if (res.code == 0) {
                success(res.data);
            } else if (res.code == 1002) {
                localStorage.removeItem("xb_token");
                window.location.reload();
            } else {
                if (error) {
                    error(res);
                }
            }
        }
    })
}

function badToken(params, url, success) {
    publicGetData('getToken', '/customer/wechat/login', function (data) {
        localStorage.setItem("xb_token", data.token);
        publicGetData(params, url, success);
    })
}

function publicGetData2(params, url, success, error) {
    $(".loading").show();
    $.ajax({
        'url': url,
        'data': params,
        'type': 'POST',
        'dataType': 'json',
        success: function (res) {
            $(".loading").hide();
            if (res.code == 0) {
                success(res.data);
            } else {
                if (error) {
                    error(res);
                }
            }
        }
    })
}