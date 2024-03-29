package com.example.taskopia.model

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import jakarta.persistence.*

@Entity
@Table(name = "task_lists")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne
    @JoinColumn(name = "board_id")
    var board: Board? = null

    @Column(name = "title", nullable = false)
    var title: String = ""

    @OneToMany(mappedBy = "taskList", cascade = [CascadeType.ALL])
    var tasks: List<Task> = mutableListOf()

    @Column(name = "positionInBoard", nullable = false)
    var positionInBoard: Int = 0
}