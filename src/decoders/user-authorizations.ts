import type { UserAuthorizations } from "~/models";

export const decodeUserAuthorizations = (data: any): UserAuthorizations => {
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
    maxHomeworkFileUploadSize: data.tailleMaxRenduTafEleve
  };
};
