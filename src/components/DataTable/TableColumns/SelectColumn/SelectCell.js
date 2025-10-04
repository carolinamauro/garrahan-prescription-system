import {Checkbox} from "@/components/ui/checkbox";

export const SelectCell = ({ row }) => (
    <div className="flex items-center justify-center">
        <Checkbox
            checked={ row.getIsSelected() }
            onCheckedChange={ (value) => row.toggleSelected(!!value) }
            aria-label="Select row"
        />
    </div>
)
