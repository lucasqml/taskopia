package com.example.taskopia.model

import jakarta.persistence.*

@Entity
@Table(name = "boards")
class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @OneToOne
    @JoinColumn(name = "user_id")
    var user: User? = null

    @OneToMany(mappedBy = "board", cascade = [CascadeType.ALL])
    var taskLists: List<TaskList> = mutableListOf()
}