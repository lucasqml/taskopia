// TaskController.kt
package com.example.taskopia.controller

import com.example.taskopia.model.Task
import com.example.taskopia.repository.TaskRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = ["http://localhost:3000"])
class TaskController(private val taskRepository: TaskRepository) {

    @GetMapping("/{taskListId}")
    fun getTasksByTaskListId(@PathVariable taskListId: Long): Iterable<Task> = taskRepository.findByTaskListId(taskListId)

    @PostMapping("")
    fun createTask(@RequestBody task: Task): Task = taskRepository.save(task)

    @PutMapping("")
    fun updateTask(@RequestBody task: Task): Task {
        if(task.id == null ){
            throw IllegalArgumentException("Id should be provided");
        }
        if(taskRepository.findById(task.id!!).isEmpty) {
            throw IllegalArgumentException("Task Not Found");
        }

        return taskRepository.save(task)
    }
}