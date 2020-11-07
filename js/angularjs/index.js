var app = angular.module("app", []);

app.controller("ctrl", function ($scope, $http) {

    //
    // Projects
    //

    // Body
    $scope.projects = [];
    $scope.tasks = [];

    $scope.projectRowExpanded = -1;   
    $scope.projectFormVis = false;
    $scope.taskFormVis = false;

    selectAllProjects();
    selectAllTasks();
    // End Body

    $scope.expandProjectRow = function(index) {
        if($scope.projectRowExpanded == index)  { $scope.projectRowExpanded = -1; }
        else                                    { $scope.projectRowExpanded = index; }
    }

    $scope.toggleProjectFormVis = function() {
        $scope.projectFormVis = !$scope.projectFormVis;
        $scope.newProjectName = $scope.newProjectDescription = $scope.newProjectArea = $scope.newProjectManager = "";
    }

    $scope.toggleTaskFormVis = function() {
        $scope.taskFormVis = !$scope.taskFormVis;
        $scope.newTaskProject = $scope.newTaskName = $scope.newTaskDescription = "";
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
            $scope.projectFormVis = false;
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

    //
    // End Projects
    //

    //
    // Tasks
    //

    $scope.addTask = function() {
        var projectId = $scope.newTaskProject;
        var name = $scope.newTaskName;
        var description = $scope.newTaskDescription;
        var t = new Task(name, description, projectId);

        $http({
            method: "put",
            url: "php/task/insertTask.php",
            data: { projectId: projectId, name: name, description: description }
        }).then(function success(response) {
            $scope.tasks.push(t);
            $scope.taskFormVis = false;
        }, function failure(response) {
            console.log("Database error" + response.data);
        });
    }

    $scope.removeTask = function(index, id) {
        $http({
            method: "delete",
            url: "php/task/deleteTask.php",
            data: { id: id }
        }).then(function success(response) {
            $scope.tasks.splice(index, 1);
        }, function failure(response) {
            console.log("Database error" + response.data);
        });
    }

    function selectAllTasks() {
        $http({
            method: "get",
            url: "php/task/selectAllTasks.php"
            // data: { projectId: id}
        }).then(function success(response) { // php returns records, these are some of the fields. It also gets the project id and description because this is going to be it's own page.
            var arr = response.data;
            // $scope.tasks = arr;
            for(var i = 0; i < arr.length; i++) {
                var t = arr[i];
                $scope.tasks.push(new Task(t.task_name, t.task_desc, t.project_id, t.task_id));
            }
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }

    //
    // End Tasks
    //
});