//
// Projects Controller
//

app.controller("ctrlProjects", ["$scope", "$http", "$location", "$route", function ($scope, $http, $location, $route) {
    $scope.projects = [];
    $scope.projectRowExpanded = -1;   
    $scope.projectFormVis = false;
    selectAllProjects();

    $scope.routeTo = function(path) {
        $location.url(path);
    }

    $scope.getTasksForProject = function(projectId) {
        $location.url("tasks/" + projectId);
    }

    // $scope.expandProjectRow = function(index) {
    //     if($scope.projectRowExpanded == index)  { $scope.projectRowExpanded = -1; }
    //     else                                    { $scope.projectRowExpanded = index; }
    // }

    $scope.toggleProjectFormVis = function() {
        $scope.projectFormVis = !$scope.projectFormVis;
        $scope.newProjectName = $scope.newProjectDescription = $scope.newProjectArea = $scope.newProjectManager = "";
    }

    $scope.addProject = function() {
        if(!$scope.newProjectName || !$scope.newProjectDescription || !$scope.newProjectArea || !$scope.newProjectManager) { return; }
        var name = $scope.newProjectName;
        var description = $scope.newProjectDescription;
        var area = $scope.newProjectArea;
        var manager = $scope.newProjectManager;
        var p = new Project(name, description, area, manager);        

        $http({
            method: "put",
            url: "php/project/insertProject.php",
            data: { name: name, description: description, area: area, manager: manager }
        }).then(function success() {
            $scope.projects.push(p);
            $route.reload();
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }

    $scope.removeProject = function(index, recId) {       
        $http({
            method: "delete",
            url: "php/project/deleteProject.php",
            data: { id: recId }
        }).then(function success() {
            $scope.projects.splice(index, 1);
            // console.log(response.data);
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }

    function selectAllProjects() {
        $http({
            method: "get",
            url: "php/project/selectAllProjects.php"
        }).then(function success(response) {
            var arr = response.data;            
            for(var i = 0; i < arr.length; i++) {
                $scope.projects.push(new Project(arr[i].name, arr[i].description, arr[i].area, arr[i].manager, arr[i].id));
            }
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }
}]);
