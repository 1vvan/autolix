import { ReactComponent as Logout } from "@icons/logout.svg";
import { ReactComponent as ChevronDown } from "@icons/chevron-down.svg";
import { ReactComponent as Cross } from "@icons/x.svg";
import { ReactComponent as Edit } from "@icons/edit.svg";
import { ReactComponent as Trash } from "@icons/trash.svg";


export const ICON_COLLECTION = {
  logout: Logout,
  chevronDown: ChevronDown,
  cross: Cross,
  edit: Edit,
  trash: Trash
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];
