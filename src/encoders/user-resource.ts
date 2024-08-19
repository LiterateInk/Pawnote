import type { UserResource } from "~/models";

// we simply encode the entity, nothing more is required most of the time.
export const encodeUserResource = (resource: UserResource): any => ({
  G: resource.kind,
  L: resource.name,
  N: resource.id
});
