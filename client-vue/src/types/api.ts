export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
}

export type CreatePostDTO = Omit<Post, '_id' | 'createdAt' | 'author'>;

export type UpdatePostDTO = Partial<CreatePostDTO>;