//
// Projects Controller
//

app.controller("ctrlProjects", ["$scope", "$http", "$location", "$route", function ($scope, $http, $location, $route) {

    $scope.projects = [];
    $scope.projectRowExpanded = -1;   
    $scope.projectFormVis = false;
    selectAllProjects();

    $scope.editProjectFormVis = false;
    $scope.editThisProject;
    var editProjectBeforeChanges;

    $scope.editProject = function(p) {
        $scope.editProjectFormVis = true;
        $scope.editThisProject = p;
        editProjectBeforeChanges = Object.assign({}, p);
    }

    $scope.cancelProjectUpdate = function() {
        $scope.projects[$scope.projects.indexOf($scope.editThisProject)] = Object.assign({}, editProjectBeforeChanges);
        $scope.toggleEditProjectFormVis();
    }

    $scope.toggleEditProjectFormVis = function() {
        $scope.editProjectFormVis = !$scope.editProjectFormVis;
        $scope.editThisProject = null;
    }

    $scope.submitProjectUpdate = function() {
        var id = $scope.editThisProject.id;
        var name = $scope.editThisProject.name;
        var area = $scope.editThisProject.area;
        var manager = $scope.editThisProject.manager;
        var description = $scope.editThisProject.description;
        // console.log(`${name} ${description} ${area} ${manager}`);

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


    $scope.showNewProjectForm = function() {
        $scope.toggleProjectFormVis();
        $scope.editProjectFormVis = false;
    }

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
        }).then(function success(response) {
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
        }).then(function success(response) {
            $scope.projects.splice(index, 1);
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
