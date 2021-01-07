import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Index("comment_pkey", ["uid"], { unique: true })
@Entity("comment", { schema: "posthoop" })
export class Comment {
  @Column("uuid", {
    primary: true,
    name: "uid",
    default: () => "uuid_generate_v4()",
  })
  uid: string;

  @Column("character varying", { name: "text" })
  text: string;

  @Column("uuid", { name: "url_image", nullable: true, array: true })
  urlImage: string[] | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn([{ name: "uid_post", referencedColumnName: "uid" }])
  uidPost: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn([{ name: "uid_user", referencedColumnName: "uid" }])
  uidUser: User;
}
