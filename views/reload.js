/*
this enables livereload
*/
window.isDev = false;

function _reloader() {
    function subscribe(url, callback) {
        var source = new window.EventSource(url);
        source.onmessage = function (e) {
            callback(e.data);
            console(e.data);
            configDev();
        };
        source.onerror = function (e) {
            if (source.readyState == window.EventSource.CLOSED) return;
            console.log('sse error', e);
        };
        return source.close.bind(source);
    };
    subscribe('/eventstream', function (data) {
        console.log(data)
        if (data && /reload/.test(data)) {
            window.location.reload();
        }
    });
};

function configDev() {
    if (!window.isDev) {
        window.isDev = true;
    }
}
window.onload = function () {
    _reloader();
}