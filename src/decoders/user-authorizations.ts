import type { UserAuthorizations } from "~/models";

function explore(data: Array<any>): number[] {
  let list: number[] = [];
  function traverse(obj: any): void {
    if ("G" in obj) {
      list.push(obj.G);
    }
    if (obj.Onglet) {
      obj.Onglet.forEach((child: any) => traverse(child));
    }
  }
  data.forEach((item) => {
    traverse(item);
  });
  return list;
}

export const decodeUserAuthorizations = (data: any, tabs: any): UserAuthorizations => {
  const canReadDiscussions = data.AvecDiscussion ?? false;
  const canDiscuss = canReadDiscussions && !(data.discussionInterdit ?? false);
  const canDiscussWithStaff = canDiscuss && (data.AvecDiscussionPersonnels ?? false);
  const canDiscussWithParents = canDiscuss && (data.AvecDiscussionParents ?? false);
  const canDiscussWithStudents = canDiscuss && (data.AvecDiscussionEleves ?? false);
  const canDiscussWithTeachers = canDiscuss && (data.AvecDiscussionProfesseurs ?? false);

  return {
    canReadDiscussions,
    canDiscuss,
    canDiscussWithStaff,
    canDiscussWithParents,
    canDiscussWithStudents,
    canDiscussWithTeachers,

    hasAdvancedDiscussionEditor: data.AvecDiscussionAvancee ?? false,
    maxHomeworkFileUploadSize: data.tailleMaxRenduTafEleve,

    allowedTabs: explore(tabs)
  };
};
