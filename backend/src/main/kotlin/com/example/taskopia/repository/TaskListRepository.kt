package com.example.taskopia.repository

import com.example.taskopia.model.TaskList
import org.springframework.data.repository.CrudRepository

interface TaskListRepository : CrudRepository<TaskList, Long> {
    fun findByBoardId(boardId: Long): Iterable<TaskList>
}