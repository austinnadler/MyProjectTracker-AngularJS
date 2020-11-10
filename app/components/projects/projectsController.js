app.controller("ctrlProjects", ["$scope", "$http", "$location", "$route", function ($scope, $http, $location, $route) {
    $scope.projects = [];
    $scope.projectRowExpanded = -1;   
    $scope.projectFormVis = false;
    $scope.editProjectFormVis = false;
    selectAllProjects();

    $scope.editThisProject;
    var editProjectBeforeChanges;

    $scope.editProject = function(p) {
        $scope.editProjectFormVis = true;
        $scope.editThisProject = p;
        editProjectBeforeChanges = Object.assign({}, p);
        $scope.projectFormVis = false;
    }

    $scope.cancelProjectUpdate = function() {
        $scope.projects[$scope.projects.indexOf($scope.editThisProject)] = Object.assign({}, editProjectBeforeChanges);
        $scope.toggleEditProjectFormVis();
    }

    $scope.toggleEditProjectFormVis = function() {
        $scope.editProjectFormVis = !$scope.editProjectFormVis;
        $scope.editThisProject = null;
    }

    $scope.showNewProjectForm = function() {
        $scope.toggleProjectFormVis();
        $scope.editProjectFormVis = false;
    }

    $scope.toggleProjectFormVis = function() {
        $scope.projectFormVis = !$scope.projectFormVis;
        $scope.newProjectName = $scope.newProjectDescription = $scope.newProjectArea = $scope.newProjectManager = "";
    }

    $scope.routeTo = function(pId) {
        $location.url('tasks/' + pId);
    }

    //
    //  $http
    //

    function selectAllProjects() {
        $http({
            method: "get",
            url: "php/project/selectProjects.php"
        }).then(function success(response) {
            var arr = response.data;            
            for(var i = 0; i < arr.length; i++) {
                $scope.projects.push(new Project(arr[i].name, arr[i].description, arr[i].area, arr[i].manager, arr[i].id));
            }
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }

    $scope.createProject = function() {
        var name = $scope.newProjectName;
        var description = $scope.newProjectDescription;
        var area = $scope.newProjectArea;
        var manager = $scope.newProjectManager;
        if(!name || !description || !area || !manager) { return; }
        var p = new Project(name, description, area, manager);        

        $http({
            method: "put",
            url: "php/project/insertProject.php",
            data: { name: name, description: description, area: area, manager: manager }
        }).then(function success(response) {
            $scope.projects.push(p);
            $route.reload();      
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }
    
    $scope.updateProject = function() {
        var id = $scope.editThisProject.id;
        var name = $scope.editThisProject.name;
        var area = $scope.editThisProject.area;
        var manager = $scope.editThisProject.manager;
        var description = $scope.editThisProject.description;
        if(!name || !description || !area || !manager) { return; }

        $http({
            method: "post",
            url: "php/project/updateProject.php",
            data: { id: id, name: name, description: description, area: area, manager: manager }
        }).then(function success(response) {
            if(response.data === "success") {
                // $scope.toggleEditProjectFormVis();
                $route.reload();
            } else {
                console.log("Error updating project.\n" + response.data);
            }            
            // $route.reload();
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }

    $scope.deleteProject = function(index, recId) {       
        $http({
            method: "delete",
            url: "php/project/deleteProject.php",
            data: { id: recId }
        }).then(function success(response) {
            $scope.projects.splice(index, 1);
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }
}]);