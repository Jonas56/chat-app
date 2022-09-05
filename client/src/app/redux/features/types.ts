export interface AuthSliceState {
  isAuthenticated: boolean;
  user: any;
  message: string | null;
  isLoading: boolean;
  status: "idle" | "fulfilled" | "rejected";
  errorMessage: string | null;
}

export interface DiscussionSliceState {
  activeDiscussion: any;
  discussions: any;
}
