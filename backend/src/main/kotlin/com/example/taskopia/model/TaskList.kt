package com.example.taskopia.model

import jakarta.persistence.*

@Entity
@Table(name = "task_lists")
class TaskList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne
    @JoinColumn(name = "board_id")
    var board: Board? = null

    @OneToMany(mappedBy = "taskList", cascade = [CascadeType.ALL])
    var tasks: List<Task> = mutableListOf()

    @Column(name = "positionInBoard", nullable = false)
    var positionInBoard: Int = 0
}