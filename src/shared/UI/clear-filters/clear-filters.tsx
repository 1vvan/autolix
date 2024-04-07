import { Icon } from "@/shared/components/icon/icon";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import React from "react";

interface ClearFiltersProps {
    onClearFilters: () => void;
}

export const ClearFilters: React.FC<ClearFiltersProps> = ({onClearFilters}) => {
    return(
        <button className="border-none p-0" onClick={onClearFilters}>
            <Icon icon={ICON_COLLECTION.cross} iconSize="24px" iconColor={'#b30000'}/>
        </button>
    )
}