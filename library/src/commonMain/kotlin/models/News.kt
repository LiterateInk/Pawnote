package models

data class News(
    val categories: List<NewsCategory>,
    val items: List<NewsItem<Any>>
)
