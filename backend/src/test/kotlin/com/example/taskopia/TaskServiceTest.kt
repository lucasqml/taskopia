package com.example.taskopia.service

import com.example.taskopia.model.Task
import com.example.taskopia.model.dto.UpdateTaskDto
import com.example.taskopia.repository.TaskListRepository
import com.example.taskopia.repository.TaskRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.ArgumentMatchers.anyLong
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import java.util.*

class TaskServiceTest {

    private lateinit var taskService: TaskService
    private lateinit var taskRepository: TaskRepository
    private lateinit var taskListRepository: TaskListRepository

    @BeforeEach
    fun setUp() {
        taskRepository = mock(TaskRepository::class.java)
        taskListRepository = mock(TaskListRepository::class.java)
        taskService = TaskService(taskRepository, taskListRepository)
    }

    @Test
    fun `should update data when task exists`() {
        val task = Task("oldTitle", "oldDescription", 1)
        val updateTaskDto = UpdateTaskDto("newTitle", "newDescription")

        `when`(taskRepository.findById(anyLong())).thenReturn(Optional.of(task))
        `when`(taskRepository.save(any(Task::class.java))).thenAnswer { it.getArgument(0) }

        val updatedTask = taskService.updateData(1, updateTaskDto)

        assertEquals("newTitle", updatedTask.title)
        assertEquals("newDescription", updatedTask.description)
    }

    @Test
    fun `should throw exception when task doesn't not exist`() {
        val updateTaskDto = UpdateTaskDto("newTitle", "newDescription")

        `when`(taskRepository.findById(anyLong())).thenReturn(Optional.empty())

        assertThrows(IllegalArgumentException::class.java) {
            taskService.updateData(1, updateTaskDto)
        }
    }
}