package com.example.taskopia

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TaskopiaApplication

fun main(args: Array<String>) {
	runApplication<TaskopiaApplication>(*args)
}
