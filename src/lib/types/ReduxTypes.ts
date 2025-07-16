declare interface AuthSlice {
  token: string | null;
  user: User | null;
}
declare interface PostsSlice {
  posts: Post[] | null;
  isLoading: boolean;
}
