import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BanUserDto {
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number
  @ApiProperty({ example: 'Censorship', description: 'Ban reason' })
  @IsString({ message: 'Must be a string' })
  readonly banReason: string
}
