package com.example.taskopia.repository

import com.example.taskopia.model.Task
import org.springframework.data.repository.CrudRepository

interface TaskRepository : CrudRepository<Task, Long> {
    fun findByTaskListId(taskListId: Long): Iterable<Task>
}