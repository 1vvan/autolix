import { ReactComponent as Logout } from "@icons/logout.svg";


export const ICON_COLLECTION = {
  logout: Logout,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];
