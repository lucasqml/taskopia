package com.example.taskopia

import com.example.taskopia.model.Task
import com.example.taskopia.model.dto.UpdateTaskDto
import com.example.taskopia.repository.TaskRepository
import com.example.taskopia.service.TaskService
import junit.framework.TestCase.assertTrue
import junit.framework.TestCase.fail
import org.junit.ClassRule
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
class TaskServiceIntegrationTests @Autowired constructor(private val taskService: TaskService, private val taskRepository: TaskRepository){

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
        assertTrue(task.title == "newTitle")
        assertTrue(task.description == "newDescription")
    }

//    @Test
//    fun `should throw exception when task doesn't not exists`() {
//        taskService.updateData(1, UpdateTaskDto("", "")).andExpect{
//                result -> assertTrue(result.resolvedException is IllegalArgumentException)
//            }
//
//    }

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