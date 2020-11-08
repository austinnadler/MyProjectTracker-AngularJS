class Task {

    id;
    name;
    description;
    projectId;
    projectName;
    projectDescription;    

    constructor(name, description, projectId, projectName, projectDescription, id) {
        this.name = name;
        this.description = description;
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.id = id;
    }

}