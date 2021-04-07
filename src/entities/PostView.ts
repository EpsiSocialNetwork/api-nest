import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity("post")
export class PostView {
  @ViewColumn({ name: "uid" })
  uid: string;

  @ViewColumn({ name: "text" })
  text: string;

  @ViewColumn({ name: "uid_user" })
  uidUser: string;

  @ViewColumn({ name: "url_image" })
  urlImage: string[] | null;

  @ViewColumn({ name: "created_at" })
  createdAt: Date | null;

  @ViewColumn({ name: "updated_at" })
  updatedAt: Date | null;
}