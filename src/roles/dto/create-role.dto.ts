import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  @IsString({ message: 'Must be a string' })
  readonly value: string
  @ApiProperty({ example: 'Administrator', description: 'Description' })
  @IsString({ message: 'Must be a string' })
  readonly description: string
}
