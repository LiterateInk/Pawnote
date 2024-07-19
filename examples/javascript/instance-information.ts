import { pronote_url_to_root, get_instance_information } from "pawnote";

const pronote_url_root = pronote_url_to_root("https://demo.index-education.net/pronote//");
const instance_information = await get_instance_information(pronote_url_root);

console.log(`SERVER DATE: ${instance_information.date}`);
console.log(`SCHOOL NAME: ${instance_information.school_name}`);
console.log(`VERSION: ${instance_information.version.join(".")}`);
if (instance_information.cas.active) {
  console.log("[CAS] Active");
  console.log("[CAS] URL:", instance_information.cas.url);
  console.log("[CAS] TOKEN:", instance_information.cas.token);
} else console.warn("[CAS] Not active");
for (const webspace of instance_information.webspaces) {
  console.log("[WEBSPACE]", webspace.name, ":", webspace.path);
}