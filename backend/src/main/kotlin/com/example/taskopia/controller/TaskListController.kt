// TaskListController.kt
package com.example.taskopia.controller

import com.example.taskopia.model.TaskList
import com.example.taskopia.repository.TaskListRepository
import com.example.taskopia.service.TaskListService
import com.example.taskopia.model.dto.UpdateTaskListDto
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = ["http://localhost:3000"])
class TaskListController(
    private val taskListService: TaskListService
) {

    @GetMapping("/{boardId}")
    fun getTaskListsByBoardId(@PathVariable boardId: Long): Iterable<TaskList> = taskListService.getTaskListsByBoardId(boardId)

    @PostMapping("")
    fun createTaskList(@RequestBody taskList: TaskList): TaskList = taskListService.createTaskList(taskList)

    @PutMapping("/{taskListId}")
    fun updateTaskList(@PathVariable taskListId: Long, @RequestBody updateTaskListDto: UpdateTaskListDto): TaskList = taskListService.updateTaskList(taskListId, updateTaskListDto.title)
}