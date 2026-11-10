import { Comment } from "./Comment";
import { Like } from "./Like";
import { Post } from "./Post";
import { User } from "./User";

import { initAssociations } from "./associations";
initAssociations();

export { Comment, Like, Post, User };
