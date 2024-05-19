enum ApiAccountType {
  common(0, "Commun", ""), // No path since the "Commun" account is on root path.
  student(6, "Élève", "mobile.eleve.html"),
  parent(7, "Parent", "mobile.parent.html"),
  teacher(8, "Professeur", "mobile.professeur.html"),
  accompagnant(26, "Accompagnant", "mobile.accompagnant.html"),
  vieScolaire(14, "Vie Scolaire", "mobile.viescolaire.html"),
  direction(17, "Direction", "mobile.direction.html");

  const ApiAccountType(this.id, this.name, this.path);
  final int id;
  final String name;
  final String path;
}
