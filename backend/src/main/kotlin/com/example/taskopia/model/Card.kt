// Card.kt
package com.example.taskopia.model

import jakarta.persistence.*

@Entity
@Table(name = "cards")
data class Card(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,

        @Column(name = "title", nullable = false)
        var title: String = "",

        @Column(name = "description", nullable = false)
        var description: String = "",

        @Column(name = "status", nullable = false)
        var status: String = ""
)