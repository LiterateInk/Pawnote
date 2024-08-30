package models

import kotlinx.datetime.Instant

data class InstanceAccount(
    val name: String,
    val path: String
)

data class Instance(
    val version: List<Int>,
    val name: String,
    val date: Instant,
    val accounts: List<InstanceAccount>,
    val casURL: String?,
    val casToken: String?
)
