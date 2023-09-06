import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@project/shared/app-types';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
