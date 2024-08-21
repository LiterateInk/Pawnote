import type { TabLocation, UserAuthorizations } from "~/models";

export const decodeUserAuthorizations = (data: any, tabs: any[]): UserAuthorizations => {
  const canReadDiscussions = data.AvecDiscussion ?? false;
  const canDiscuss = canReadDiscussions && !(data.discussionInterdit ?? false);
  const canDiscussWithStaff = canDiscuss && (data.AvecDiscussionPersonnels ?? false);
  const canDiscussWithParents = canDiscuss && (data.AvecDiscussionParents ?? false);
  const canDiscussWithStudents = canDiscuss && (data.AvecDiscussionEleves ?? false);
  const canDiscussWithTeachers = canDiscuss && (data.AvecDiscussionProfesseurs ?? false);

  const locations: TabLocation[] = [];

  if (tabs.length > 0) {
    const traverse = (obj: any): void => {
      if ("G" in obj) {
        locations.push(obj.G);
      }

      if ("Onglet" in obj) {
        obj.Onglet.forEach(traverse);
      }
    };

    tabs.forEach(traverse);
  }

  return {
    canReadDiscussions,
    canDiscuss,
    canDiscussWithStaff,
    canDiscussWithParents,
    canDiscussWithStudents,
    canDiscussWithTeachers,

    hasAdvancedDiscussionEditor: data.AvecDiscussionAvancee ?? false,
    maxAssignmentFileUploadSize: data.tailleMaxRenduTafEleve,

    tabs: locations
  };
};
