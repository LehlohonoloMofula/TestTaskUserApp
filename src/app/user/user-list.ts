import { User } from "./user";

export interface UserList {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: User[];
  totalCount: number;
  pageIndex: number;
  totalPages: number;
}
