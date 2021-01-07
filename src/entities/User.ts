import { Column, Entity, Index, OneToMany } from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Index("user_email_key", ["email"], { unique: true })
@Index("user_pkey", ["uid"], { unique: true })
@Entity("user", { schema: "posthoop" })
export class User {
  @Column("uuid", {
    primary: true,
    name: "uid",
    default: () => "uuid_generate_v4()",
  })
  uid: string;

  @Column("character varying", { name: "email", unique: true })
  email: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "username" })
  username: string;

  @Column("character varying", { name: "fullname" })
  fullname: string;

  @Column("character varying", { name: "description", nullable: true })
  description: string | null;

  @Column("uuid", { name: "picture_profile", nullable: true })
  pictureProfile: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("character", { name: "code_country", nullable: true, length: 2 })
  codeCountry: string | null;

  @OneToMany(() => Post, (post) => post.uidUser)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.uidUser)
  comments: Comment[];
}
