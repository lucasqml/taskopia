package com.example.taskopia.service

import com.example.taskopia.model.Task
import com.example.taskopia.model.dto.UpdateTaskDto
import com.example.taskopia.repository.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService (private val taskRepository: TaskRepository) {


    fun updateData(taskId: Long, updateTaskDto: UpdateTaskDto): Task {
        var queryResult = taskRepository.findById(taskId)
        if(queryResult.isEmpty) {
            throw IllegalArgumentException("Task Not Found");
        }

        var taskFound = queryResult.get()
        taskFound.title = updateTaskDto.title
        taskFound.description = updateTaskDto.description

        return taskRepository.save(taskFound)
    }
}