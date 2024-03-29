package com.example.taskopia.model

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import jakarta.persistence.*

@Entity
@Table(name = "boards")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator::class, property = "id")
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