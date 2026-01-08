const fs = require("fs");

const filePath = "./tasks.json";

const loadTasks = ()=>{
    try{
        const dataBuffer = fs.readFileSync(filePath);

        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    }
    catch (error){
        return [];
    }

};

const addTask = (task) =>{
    
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Tasks added ", task);
    


}

const saveTasks = (tasks) =>{
    const dataJSON = JSON.stringify(tasks);  //opposite of JSON.parse....this is done to reconvert it into strings because file stores data in string format...
    fs.writeFileSync(filePath,dataJSON);

}

const listTask = () =>{
      const tasks = loadTasks();
      tasks.forEach((task,index)=>console.log(`${index+1} - ${task.task}`));

};

const removeTask = (index) =>{
    const tasks = loadTasks();
     
    if(index < 1 || index >tasks.length){
        console.log("Invalid index");
    }

   const removed = tasks.splice(index-1,1);
   saveTasks(tasks);

   console.log(`Task ${removed[0].task} removed Sucessfully !!!`);
   

}


const command = process.argv[2];
const argument = process.argv[3];


if(command === "add"){
    addTask(argument);

}
else if(command === "list"){
    listTask();
}
else if(command === "remove"){
    removeTask(parseInt(argument));
}
else{
    console.log("command not found !");
}