package ink.literate.pawnote.encoders

fun encodeDomain(numbers: List<Int>): String {
  if (numbers.isEmpty()) return "[]"
  val sorted = numbers.sortedWith { a, b -> a - b }
  val output: MutableList<String> = mutableListOf()

  var last = sorted[0]
  var start = last

  for (index in 1..<sorted.count()) {
    if (sorted[index] - last != 1) {
      if (start == last) output.add(start.toString()) else output.add("$start..$last")
      start = sorted[index]
    }

    last = sorted[index]
  }

  if (start == last) output.add(start.toString()) else output.add("$start..$last")

  return "[${output.joinToString(",")}]"
}
