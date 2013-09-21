var app = angular.module('Search', []);

app.controller('SearchCtrl', function($scope, $http) {
    $scope.data = [];

    $http.get('https://spreadsheets.google.com/feeds/cells/0AjBVHYwKbJpzdDdWQUhZc3NLNlg4UXllM3doa2tINGc/od6/public/basic?alt=json');
    .success(function(response) {
        $scope.data = response.feed.entry.reduce(function(memo, cell, i) {
            var row = ~~(i/3),
                prop = ['title', 'url', 'description'][i%3];
            
            memo[row] = memo[row] || {};
            memo[row][prop] = cell.content['$t'];
    
            return memo;
        }, []);
    });
});
    
