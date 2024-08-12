/** Represents a subject in a student account. */
export class StudentSubject {
  public id: string;
  public name: string;
  /** If the subject is in groups. */
  public groups: boolean;

  constructor (subject: {
    L: string
    N: string
    estServiceGroupe?: boolean
  }) {
    this.id = subject.N;
    this.name = subject.L;
    this.groups = subject.estServiceGroupe ?? false;
  }
}
