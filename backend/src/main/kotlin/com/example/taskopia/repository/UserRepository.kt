package com.example.taskopia.repository

import com.example.taskopia.model.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Long> {
}