package ink.literate.pawnote.models

data class News(
    val categories: List<ink.literate.pawnote.models.NewsCategory>,
    val items: List<ink.literate.pawnote.models.NewsItem<Any>>
)