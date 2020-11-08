app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
    .when("/projects", {
        templateUrl: "app/components/projects/projectsView.html",
        controller: "ctrlProjects"
    })
    .when("/tasks", {
        templateUrl: "app/components/tasks/tasksView.html",
        controller: "ctrlTasks"
    })
    .when("/tasks/:projectId", {
        templateUrl: "app/components/tasks/tasksView.html",
        controller: "ctrlTasks"
    })
    .otherwise({
        redirectTo: "/projects"
    });
}]);