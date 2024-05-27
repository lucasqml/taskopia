package com.example.taskopia

import com.example.taskopia.integration.DatabaseContainer
import com.example.taskopia.model.Task
import com.example.taskopia.model.TaskList
import com.example.taskopia.model.dto.MoveTaskDto
import com.example.taskopia.model.dto.UpdateTaskDto
import com.example.taskopia.repository.TaskListRepository
import com.example.taskopia.repository.TaskRepository
import com.example.taskopia.service.TaskService
import junit.framework.TestCase.assertTrue
import junit.framework.TestCase.fail
import org.junit.Assert.assertEquals
import org.junit.ClassRule
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class TaskServiceIntegrationTests @Autowired constructor(private val taskService: TaskService, private val taskRepository: TaskRepository, private val taskListRepository: TaskListRepository){

    @BeforeEach
    @Transactional
    fun cleanUp() {
        taskRepository.deleteAll()
    }

    @Test
    fun `should throw exception when task doesn't not exist`() {
        try {
            taskService.updateData(1, UpdateTaskDto("", ""))
            fail("Expected an IllegalArgumentException to be thrown")
        } catch (e: Exception) {
            assertTrue(e is IllegalArgumentException)
        }
    }

    @Test
    fun `should update data when task exists`() {
        var task: Task = taskRepository.save(Task("oldTitle", "oldDescription", 1))

        task = taskService.updateData(1, UpdateTaskDto("newTitle", "newDescription"))
        assertEquals(task.title,"newTitle")

        assertEquals(task.description,"newDescription")
    }


    @Test
    fun `should move task to another task list`() {
        // arrange
        val originTaskList =  taskListRepository.save(
            TaskList(
            title = "Lista 1",
            positionInBoard = 1
        )
        )
        val targetTaskLIst: TaskList = taskListRepository.save(TaskList(
            title = "Lista 2",
            positionInBoard = 2
        ))
        val task: Task = taskRepository.save(Task("title", "description", 1))
        task.taskList = originTaskList
        taskRepository.save(task)

        // act
        taskService.moveTask(task.id!!, MoveTaskDto(targetTaskListId = targetTaskLIst.id!!, positionInTaskList = 1))

        // assert
        val updatedTask = taskRepository.findById(task.id!!).get()
        assertEquals(updatedTask.taskList?.id, targetTaskLIst.id)
    }

    companion object {
        @JvmField
        @ClassRule
        var mySQLContainer: DatabaseContainer? = DatabaseContainer.instance

        @JvmStatic
        @BeforeAll
        fun setUp(): Unit {
            mySQLContainer!!.start()
        }
    }
}