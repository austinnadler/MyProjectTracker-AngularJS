app.controller("ctrlTasks", ["$scope", "$http", "$location", "$route","$routeParams", function ($scope, $http, $location, $route, $routeParams) {
    $scope.selectedProject = $routeParams.projectId;
    $scope.tasks = [];
    $scope.projects = [];
    $scope.taskFormVis = false;
    selectTasks();
    selectProjects();

    $scope.editTaskFormVis = false;
    $scope.editThisTask;
    var editTaskBeforeChanges;

    $scope.editTask = function(t) {
        $scope.editTaskFormVis = true;
        $scope.editThisTask = t;
        editTaskBeforeChanges = Object.assign({}, t);
        $scope.taskFormVis = false;
    }

    $scope.showNewTaskForm = function() {
        $scope.toggleTaskFormVis();
        $scope.editTaskFormVis = false;
    }

    $scope.cancelTaskUpdate = function() {
        $scope.tasks[$scope.tasks.indexOf($scope.editThisTask)] = Object.assign({}, editTaskBeforeChanges);
        $scope.toggleEditTaskFormVis();
    }

    $scope.routeTo = function(path) {
        $location.url(path);
    }

    $scope.toggleTaskFormVis = function() {
        $scope.taskFormVis = !$scope.taskFormVis;
        $scope.newTaskProject = $scope.newTaskName = $scope.newTaskDescription = "";
    }

    $scope.toggleEditTaskFormVis = function() {
        $scope.editTaskFormVis = !$scope.editTaskFormVis;
        $scope.editTaskProject = null;
    }

    $scope.submitTaskUpdate = function() {
        var id = $scope.editThisTask.id;
        var name = $scope.editThisTask.name;
        var description = $scope.editThisTask.description;

        $http({
            method: "post",
            url: "php/task/updateTask.php",
            data: { id: id, name: name, description: description }
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

    $scope.addTask = function() {
        var projectId = $scope.selectedProject.id;
        var name = $scope.newTaskName;
        var description = $scope.newTaskDescription;
        var t = new Task(name, description, projectId);

        $http({
            method: "put",
            url: "php/task/insertTask.php",
            data: { projectId: projectId, name: name, description: description }
        }).then(function success(response) {
            $scope.tasks.push(t);
            $route.reload();
            console.log(response.data);
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

    function selectTasks() {
        $http({
            method: "get",
            url: "php/task/selectTasks.php"
            // data: { projectId: id}
        }).then(function success(response) { // php returns records, these are some of the fields. It also gets the project id and description because this is going to be it's own page.
            var arr = response.data;
            for(var i = 0; i < arr.length; i++) {
                var t = arr[i];
                if($scope.selectedProject) {
                    if(t.project_id == $scope.selectedProject)
                        $scope.tasks.push(new Task(t.task_name, t.task_desc, t.project_id, t.project_name, t.project_desc, t.task_id));
                } else {
                    $scope.tasks.push(new Task(t.task_name, t.task_desc, t.project_id, t.project_name, t.project_desc, t.task_id));
                }
            }
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }

    function selectProjects() {
        $http({
            method: "get",
            url: "php/project/selectAllProjects.php"
        }).then(function success(response) {
            var arr = response.data;            
            for(var i = 0; i < arr.length; i++) {
                $scope.projects.push(new Project(arr[i].name, arr[i].description, arr[i].area, arr[i].manager, arr[i].id));
                if($scope.selectedProject) {
                    if(arr[i].id == $scope.selectedProject)
                        $scope.selectedProject = arr[i];
                } 
            }
        }, function failure(response) {
            console.log("Database error: " + response.data);
        });
    }
}]);