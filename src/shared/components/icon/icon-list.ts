import { ReactComponent as Logout } from "@icons/logout.svg";
import { ReactComponent as ChevronDown } from "@icons/chevron-down.svg";
import { ReactComponent as Cross } from "@icons/x.svg";


export const ICON_COLLECTION = {
  logout: Logout,
  chevronDown: ChevronDown,
  cross: Cross,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];
