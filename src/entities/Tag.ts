import { Column, Entity, Index, ManyToMany } from "typeorm";
import { Post } from "./Post";

@Index("tag_pkey", ["uid"], { unique: true })
@Entity("tag", { schema: "posthoop_post" })
export class Tag {
  @Column("uuid", {
    primary: true,
    name: "uid",
    default: () => "uuid_generate_v4()",
  })
  uid: string;

  @Column("character varying", { name: "text" })
  text: string;

  @Column("character varying", {
    name: "color",
    nullable: true,
    default: () => "'white'",
  })
  color: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
