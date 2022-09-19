import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  @IsString({ message: 'Must be a string' })
  readonly value: string
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number
}
