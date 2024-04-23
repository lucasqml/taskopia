package com.example.taskopia.service

import com.example.taskopia.model.Task
import com.example.taskopia.model.dto.UpdateTaskDto
import com.example.taskopia.repository.TaskListRepository
import com.example.taskopia.repository.TaskRepository
import org.springframework.stereotype.Service

@Service
class TaskService (private val taskRepository: TaskRepository, private val taskListRepository: TaskListRepository) {


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

    fun moveTask(taskId: Long, targetTaskListId: Long): Task {
        val taskOptional = taskRepository.findById(taskId)
        val targetTaskListOptional = taskListRepository.findById(targetTaskListId)
        if(taskOptional.isEmpty || targetTaskListOptional.isEmpty) {
            throw IllegalArgumentException("Task Not Found");
        }

        val taskFound = taskOptional.get()
        val targetTaskList = targetTaskListOptional.get()

        taskFound.taskList = targetTaskList

        return taskRepository.save(taskFound)
    }

    fun deleteTask(taskId: Long) {
        taskRepository.deleteById(taskId)
    }
}