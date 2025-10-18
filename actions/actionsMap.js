
import {gitHelper} from './index.js';

export const {
    pushAll, showAllBranches
} = gitHelper;
const actionsMap = {
    'push': actions.pushAll,
    'seeBranches': actions.showAllBranches,


}