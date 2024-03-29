package com.example.taskopia.model

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "username", nullable = false)
    var username: String = ""

    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL])
    var board: Board? = null
}