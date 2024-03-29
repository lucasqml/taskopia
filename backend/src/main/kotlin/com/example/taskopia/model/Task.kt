package com.example.taskopia.model

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import java.time.LocalDateTime
import jakarta.persistence.*

@Entity
@Table(name = "tasks")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne
    @JoinColumn(name = "task_list_id")
    var taskList: TaskList? = null

    @Column(name = "title", nullable = false)
    var title: String = ""

    @Column(name = "description", nullable = false)
    var description: String = ""

    @Column(name = "positionInTaskList", nullable = false)
    var positionInTaskList: Int = 0

    @Column(name = "created_at", nullable = false)
    var createdAt: LocalDateTime = LocalDateTime.now()

    @Column(name = "done_at")
    var doneAt: LocalDateTime? = null
}