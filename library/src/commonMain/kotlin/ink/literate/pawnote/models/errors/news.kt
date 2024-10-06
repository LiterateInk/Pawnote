package ink.literate.pawnote.models.errors

class NewsTypeError (type: String) : Error("Incorrect news type ! Should be `$type`")