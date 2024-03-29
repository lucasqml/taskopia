package com.example.taskopia.repository

import com.example.taskopia.model.Board
import org.springframework.data.repository.CrudRepository

interface BoardRepository : CrudRepository<Board, Long> {
    fun findByUserId(userId: Long): Board?
}