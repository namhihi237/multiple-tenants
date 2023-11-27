import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from '../../enums/permission.enum';

export const PERMISSION_KEY = 'permission';
export const Permission = (permission: PermissionEnum) => SetMetadata(PERMISSION_KEY, permission);
