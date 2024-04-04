package com.example.taskopia.controller

import com.example.taskopia.model.User
import com.example.taskopia.repository.UserRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["http://localhost:3000"])
class UserController(private val userRepository: UserRepository) {

    @GetMapping("")
    fun getAllUsers(): Iterable<User> = userRepository.findAll()

    @PostMapping("")
    fun createUser(@RequestBody user: User): User = userRepository.save(user)
}