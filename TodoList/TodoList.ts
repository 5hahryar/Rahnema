type TaskState = "NEW" | "DONE" | "INPROGRESS"

interface Task {
    id: number
    title: string
    state: TaskState
}

class TodoList {
    private tasks: Task[] = []

    add(task: Task): Task {
        this.tasks.push(task)
        return task
    }

    list(): Task[] {
        return this.tasks
    }

    removeAll() {
        this.tasks = []
    }

    remove(id: number): Task {
        let task = this.tasks.find((task) => task.id === id)
        if(!task) {
            throw Error("id not found")
        }
        let index = this.tasks.indexOf(task)
        this.tasks.splice(index, 1)
        return task
    }

    search(title: string | RegExp): Task | undefined {
        return this.tasks.find((task) => task.title.match(title))
    }

    changeState(taskId: number, state: TaskState) {
        let task = this.tasks.find((task) => task.id === taskId)
        if(!task) {
            throw Error("id not found")
        }
        // QUESTION immutable way?
        task.state = state
    }

    filter(predicate: (task: Task) => boolean): Task[] {
        return this.tasks.filter(predicate)
    }
}

let todo = new TodoList()

console.log("Adding item...")
todo.add({
    id: Math.random(),
    title: "one",
    state: "NEW"
})

console.log("Todo list: ", todo.list())

console.log("Search list: ", todo.search("tw"))

console.log("Changing state...")
todo.changeState(todo.list()[0].id, "INPROGRESS")
console.log("Todo list: ", todo.list())

console.log("Filter NEW: ", todo.filter((task) => task.state === "NEW"))
console.log("Filter INPROGRESS: ", todo.filter((task) => task.state === "INPROGRESS"))

console.log("Removing item...")
todo.remove(todo.list()[0].id)

console.log("Todo list: ", todo.list())