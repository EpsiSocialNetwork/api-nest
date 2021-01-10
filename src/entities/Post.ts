import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Comment } from "./Comment";
import { Tag } from "./Tag";

@Index("post_pkey", ["uid"], { unique: true })
@Entity("post", { schema: "posthoop_post" })
export class Post {
  @Column("uuid", {
    primary: true,
    name: "uid",
    default: () => "uuid_generate_v4()",
  })
  uid: string;

  @Column("character varying", { name: "text" })
  text: string;

  @Column("uuid", { name: "uid_user" })
  uidUser: string;

  @Column("uuid", { name: "url_image", nullable: true, array: true })
  urlImage: string[] | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Comment, (comment) => comment.uidPost)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: "tag_post",
    joinColumns: [{ name: "uid_post", referencedColumnName: "uid" }],
    inverseJoinColumns: [{ name: "uid_tag", referencedColumnName: "uid" }],
    schema: "posthoop_post",
  })
  tags: Tag[];
}
