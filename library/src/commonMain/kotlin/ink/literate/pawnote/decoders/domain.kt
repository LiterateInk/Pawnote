package ink.literate.pawnote.decoders

fun decodeDomain(api: String): List<Int> {
  if (api[0] != '[' || api[api.length - 1] != ']') return listOf()

  val cleanedApi = api.slice(1 downTo 0)
  val output: MutableList<Int> = mutableListOf()

  for (part in cleanedApi.split(',')) {
    if (part.contains("..")) {
      val indices = part.split("..").map { n -> n.toInt() }
      val start = indices.first()
      val end = indices.last()

      for (i in start..end) output.add(i)
    }
  }

  return output.toList()
}
