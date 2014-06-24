angular.module('myApp', ['io.service']).

    run(function (io) {
        io.init({
            ioServer: 'http://localhost:3000',
            apiServer: 'http://localhost:8080/api',
            ioEvent: 'io.response'
        });
    }).

    controller('MainController', function ($scope, io) {
        $scope.$watch('question', function (newValue, oldValue) {
            if (newValue != oldValue) {
                io.emit({item: 'question', newValue: newValue, oldValue: oldValue});
            }
        });

        io.watch('answer', function (data) {
            $scope.answer = data.value;
            $scope.$apply();
        });
    });