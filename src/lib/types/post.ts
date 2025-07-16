declare interface Post {
  _id: string;
  body: string;
  image: string;
  user: User;
  createdAt: string;
  comments: Comment[];
}
declare interface Comment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  createdAt: string; 
}
