class Project {

    id;
    name;
    description;
    area;
    manager;
    // tasks = [];

    constructor(name, description, area, manager, id) {
        this.name = name;
        this.description = description;
        this.area = area;
        this.manager = manager;
        this.id = id;
        // this.tasks = [];
    }

    // addTask(task) {
    //     this.tasks.push(task);
    // }

}