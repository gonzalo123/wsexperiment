angular.module('io.service', []).
    factory('io', function ($http) {
        var socket,
            apiServer,
            ioEvent,
            watches = {};

        return {
            init: function (conf) {
                apiServer = conf.apiServer;
                ioEvent = conf.ioEvent;

                socket = io.connect(conf.ioServer);
                socket.on(ioEvent, function (data) {
                    return watches.hasOwnProperty(data.item) ? watches[data.item](data) : null;
                });
            },

            emit: function (arguments) {
                return $http.get(apiServer + '/request', {params: arguments});
            },

            watch: function (item, closure) {
                watches[item] = closure;
            },

            unWatch: function (item) {
                delete watches[item];
            }
        };
    });