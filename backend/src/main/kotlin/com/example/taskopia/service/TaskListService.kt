package com.example.taskopia.service

import com.example.taskopia.model.TaskList
import com.example.taskopia.repository.TaskListRepository
import org.springframework.stereotype.Service

@Service
class TaskListService (private val taskListRepository: TaskListRepository) {

    fun getTaskListsByBoardId(boardId: Long): Iterable<TaskList> = taskListRepository.findByBoardId(boardId)

    fun createTaskList(taskList: TaskList): TaskList = taskListRepository.save(taskList)

    fun updateTaskList(taskListId: Long, newTaskListTitle: String): TaskList {
        val taskListOptional = taskListRepository.findById(taskListId)
        if(taskListOptional.isEmpty) {
            throw IllegalArgumentException("Task List Not Found")
        }

        val taskList = taskListOptional.get()
        taskList.title = newTaskListTitle

        return taskListRepository.save(taskList)
    }
}