import {RolePriority, UserRole} from "@src/types/index.js";

interface Params {
    actionRole: UserRole;
    targetRole: UserRole;
    roleComparison: "equal" | "higher";
}

export function isAllowedToAction(
    {
        actionRole,
        targetRole,
        roleComparison,
    }: Params
): boolean {
    const actionPriority = RolePriority[actionRole];
    const targetPriority = RolePriority[targetRole];

    switch (roleComparison) {
        case "higher": {
            return actionPriority > targetPriority;
        }
        case "equal": {
            return actionPriority >= targetPriority;
        }
        default: {
            return false;
        }
    }
}