import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity("tag")
export class TagView {
  @ViewColumn({ name: "uid" })
  uid: string;

  @ViewColumn({ name: "text" })
  text: string;

  @ViewColumn({ name: "color" })
  color: string;
}