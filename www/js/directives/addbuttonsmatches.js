angular.module('starter').directive('addButtonCenter', function () {
    return {
        template: 'Name: {{customer.name}}<br /> Street: {{customer.street}}'
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                element.html('You clicked me!');
            });
            element.bind('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.bind('mouseleave', function () {
                element.css('background-color', 'white');
            });
        }
    };
});