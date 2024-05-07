package com.example.taskopia

import org.testcontainers.containers.MySQLContainer

/*  */
class DatabaseContainer private constructor() : MySQLContainer<DatabaseContainer>("mysql:8.1.0") {
    override fun start() {
        super.start()

        System.setProperty("spring.datasource.url", mySQLContainer!!.getJdbcUrl())
        System.setProperty(
            "spring.datasource.username",
            mySQLContainer!!.getUsername()
        )
        System.setProperty(
            "spring.datasource.password",
            mySQLContainer!!.getPassword()
        )
    }

    override fun stop() {
        // DO NOTHING
    }

    companion object {
        private var mySQLContainer: DatabaseContainer? = null

        val instance: DatabaseContainer?
            get() {
                if (mySQLContainer == null) {
                    mySQLContainer = DatabaseContainer()
                        .withDatabaseName("test")
                        ?.withUsername("test")
                        ?.withPassword("test")
                }
                return mySQLContainer
            }
    }
}
