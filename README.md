# AdvancedWebDesignExercise
ToDo Web App (Week 2)

It's a program from the design I made in the previous week. The program is a simple todo app using HTML, CSS and JS(All vanilla). 
I used local storage to store the task names and task status. 
I did cut some details that were going to take a lot of time(category, add category,...).

Here are what the app can do:
- List the tasks
- Create new tasks
- Change task status
- Search for task
- Delete tasks
- Edit tasks

However, I do have one question about using some variables in Javascript. 
The app is intended to not allowing duplicates but I struggled with a lot of those. 
Because of that I used a variable called originalTaskName to make sure the new task don’t overlap with the previous one.
But the thing is, when testing, I intentionally made some duplicates and it does alert error, which is good, but when i edit the next task, 
the next task’s name isn’t changed, instead it’s the old task that got changed. I used console.log(tasks) to check the errors 
and it turns out that javascript sends like tons of requests, resulting in occasionally failing to edit that specific task. 
So I need your help with this,. I am not good with vanilla Javascript but i’m trying. 

Github link: https://github.com/ngoinhaoto/AdvancedWebDesignExercise/tree/eo2
