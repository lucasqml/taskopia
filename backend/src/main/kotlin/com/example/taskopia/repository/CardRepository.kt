// CardRepository.kt
package com.example.taskopia.repository

import com.example.taskopia.model.Card
import org.springframework.data.repository.CrudRepository

interface CardRepository : CrudRepository<Card, Long> {
    fun findByTitle(title: String): List<Card>
    fun findByStatus(status: String): List<Card>
}
