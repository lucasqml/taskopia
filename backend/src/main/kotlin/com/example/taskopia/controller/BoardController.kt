// BoardController.kt
package com.example.taskopia.controller

import com.example.taskopia.model.Board
import com.example.taskopia.repository.BoardRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/board")
class BoardController(private val boardRepository: BoardRepository) {

    @GetMapping("/{userId}")
    fun getBoardByUserId(@PathVariable userId: Long): Board? = boardRepository.findByUserId(userId)

    @PostMapping("")
    fun createBoard(@RequestBody board: Board): Board = boardRepository.save(board)

    @PutMapping("")
    fun updateBoard(@RequestBody board: Board): Board = boardRepository.save(board)
}