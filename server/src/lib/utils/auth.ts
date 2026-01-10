import {RolePriority, UserRole} from "@src/types/index.js";

export type Comparison = "equal" | "higher";

interface Params {
    actionRole: UserRole;
    targetRole: UserRole;
    roleComparison: Comparison;
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