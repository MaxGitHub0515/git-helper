
import * as actions from './actions.js';

export const actionsMap = {
    'push': actions.pushAllChanges,
    'commit_changes': actions.commitChanges,
    'see_branches': actions.showAllBranches,
    'create_branch_switch': actions.createBranchAndSwitch,
    'switch_branch': actions.switchBranchSafely
}
