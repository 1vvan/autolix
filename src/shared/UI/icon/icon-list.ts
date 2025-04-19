import { ReactComponent as Logout } from "@icons/logout.svg";
import { ReactComponent as ChevronDown } from "@icons/chevron-down.svg";
import { ReactComponent as Cross } from "@icons/x.svg";
import { ReactComponent as Check } from "@icons/check.svg";
import { ReactComponent as Edit } from "@icons/edit.svg";
import { ReactComponent as Trash } from "@icons/trash.svg";
import { ReactComponent as Image } from "@icons/image.svg";
import { ReactComponent as Receipt } from "@icons/receipt.svg";


export const ICON_COLLECTION = {
  logout: Logout,
  chevronDown: ChevronDown,
  cross: Cross,
  check: Check,
  edit: Edit,
  trash: Trash,
  image: Image,
  receipt: Receipt
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];
