package com.example.taskopia.model.dto

data class MoveTaskDto (
    val targetTaskListId: Long,
    val positionInTaskList: Int
)