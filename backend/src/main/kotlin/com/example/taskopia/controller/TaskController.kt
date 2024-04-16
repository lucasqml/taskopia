// TaskController.kt
package com.example.taskopia.controller

import com.example.taskopia.model.Task
import com.example.taskopia.model.dto.UpdateTaskDto
import com.example.taskopia.repository.TaskRepository
import com.example.taskopia.service.TaskService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = ["http://localhost:3000"])
class TaskController(private val taskRepository: TaskRepository, private val taskService: TaskService) {

    @GetMapping("/{taskListId}")
    fun getTasksByTaskListId(@PathVariable taskListId: Long): Iterable<Task> = taskRepository.findByTaskListId(taskListId)

    @PostMapping("")
    fun createTask(@RequestBody task: Task): Task = taskRepository.save(task)

    @PutMapping("/{taskId}")
    fun updateTask(@PathVariable taskId: Long, @RequestBody task: UpdateTaskDto): Task {
        return taskService.updateData(taskId, task)
    }
}