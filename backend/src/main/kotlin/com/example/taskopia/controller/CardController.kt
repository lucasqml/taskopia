package com.example.taskopia.controller;

import com.example.taskopia.model.Card
import com.example.taskopia.repository.CardRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
class CardController(@Autowired private val cardRepository: CardRepository) {

    @GetMapping("")
    fun getAllCards(): List<Card> {
        return cardRepository.findAll().toList()
    }

    // Change the type of id to Int in the following methods
    @GetMapping("/{id}")
    fun getCardById(@PathVariable id: Long): ResponseEntity<Card> {
        val card = cardRepository.findById(id).orElse(null)
        return if (card != null) {
            ResponseEntity(card, HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("")
    fun createCard(@RequestBody card: Card): ResponseEntity<Card> {
        val newCard = cardRepository.save(card)
        return ResponseEntity(newCard, HttpStatus.CREATED)
    }

    @PutMapping("/{id}")
    fun updateCard(@PathVariable id: Long, @RequestBody card: Card): ResponseEntity<Card> {
        val existingCard = cardRepository.findById(id).orElse(null)
        return if (existingCard != null) {
            val updatedCard = cardRepository.save(card.copy(id = id))
            ResponseEntity(updatedCard, HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @DeleteMapping("/{id}")
    fun deleteCard(@PathVariable id: Long): ResponseEntity<Unit> {
        val card = cardRepository.findById(id).orElse(null)
        return if (card != null) {
            cardRepository.delete(card)
            ResponseEntity(Unit, HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }
}