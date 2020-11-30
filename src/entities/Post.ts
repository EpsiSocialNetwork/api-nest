import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Index("post_pkey", ["uid"], { unique: true })
@Entity("post", { schema: "posthoop" })
export class Post {
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

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn([{ name: "uid_user", referencedColumnName: "uid" }])
  uidUser: User;

}
