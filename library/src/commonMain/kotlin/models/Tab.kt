package models

data class Tab(
    val defaultPeriod: Period?,
    val location: TabLocation,
    val periods: List<Period>
)
