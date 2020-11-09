import { User } from '../core/model/auth.model';
import { Member } from '../core/model/project.model';
import { Role } from '../core/model/person.model';

export class CurrentUserInfo {
    user: User;
    projectMember: Member;
    isFirstSupervisor: boolean;
    isCreator: boolean;
    constructor() {
      this.user = null;
      this.projectMember = null;
      this.isFirstSupervisor = false;
      this.isCreator = false;
    }
    get personId() {
      return this.user?.personId;
    }
    get roles() {
      return this.user?.roles;
    }

    isMember() {
      return this.projectMember;
     }
    isModelLeader() {
     return this.user?.roles.includes(Role.MODULE_LEADER);
    }
    isStaff() {
      return this.user?.roles.includes(Role.STAFF);
    }
    isStudent() {
      return this.user?.roles.includes(Role.STUDENT);
    }
    shouldSign() {
      return this.projectMember && this.projectMember.signed !== true;
    }
}
