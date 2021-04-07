import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity("comment")
export class CommentView {
  @ViewColumn({ name: "uid" })
  uid: string;

  @ViewColumn({ name: "text" })
  text: string;

  @ViewColumn({ name: "uid_user" })
  uidUser: string;

  @ViewColumn({ name: "uid_post" })
  uidPost: string;

  @ViewColumn({ name: "url_image" })
  urlImage: string[] | null;

  @ViewColumn({ name: "created_at" })
  createdAt: Date | null;
}