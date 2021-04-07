import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity("tag_by_post")
export class  TagByPostView {
  @ViewColumn({ name: "uid_post" })
  uidPost: string;

  @ViewColumn({ name: "uid_tag" })
  uidTag: string;

  @ViewColumn({ name: "text" })
  text: string;

  @ViewColumn({ name: "color" })
  color: string;

  @ViewColumn({ name: "created_at" })
  createdAt: Date | null;
}