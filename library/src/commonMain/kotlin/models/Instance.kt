package models

import kotlinx.datetime.LocalDateTime

data class InstanceAccount(
    val name: String,
    val path: String
)

data class Instance(
    val version: List<Int>,
    val name: String,
    val date: LocalDateTime,
    val accounts: List<InstanceAccount>,
    val casURL: String?,
    val casToken: String?
)
