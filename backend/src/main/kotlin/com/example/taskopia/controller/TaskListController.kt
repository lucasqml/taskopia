// TaskListController.kt
package com.example.taskopia.controller

import com.example.taskopia.model.TaskList
import com.example.taskopia.repository.TaskListRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/lists")
class TaskListController(private val taskListRepository: TaskListRepository) {

    @GetMapping("/{boardId}")
    fun getTaskListsByBoardId(@PathVariable boardId: Long): Iterable<TaskList> = taskListRepository.findByBoardId(boardId)

    @PostMapping("")
    fun createTaskList(@RequestBody taskList: TaskList): TaskList = taskListRepository.save(taskList)
}