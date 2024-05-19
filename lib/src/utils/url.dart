Uri? loginPortalUrlToInstanceRootUri (final String url) {
  var uri = Uri.tryParse(url);
  if (uri == null) return null;
  // Clean any unwanted data from URL.
  uri = Uri.parse('${uri.origin}${uri.path}');

  // Clear the last path if we're not main selection menu.
  final paths = uri.path.split("/").where((path) => path.isNotEmpty).toList();
  if (paths.last.endsWith(".html")) {
    paths.removeLast();
  }

  // Rebuild URL with cleaned paths.
  uri = uri.replace(path: paths.join("/"));

  // Return rebuilt URL.
  return uri;
}
