export type ApiResponse<T = unknown> = {
  status: boolean;
  data?: T;
};
