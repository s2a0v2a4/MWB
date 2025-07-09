import { IsString, IsNotEmpty, IsIn, Matches, IsOptional, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(['Sport', 'Musik', 'Kunst'])
  category: string;

  @IsString()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, { message: 'Time must be in HH:mm format' })
  time: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  participants?: number;
}
