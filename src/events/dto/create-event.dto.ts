import { IsString, IsNotEmpty, Matches, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string; // 'Sport', 'Musik', 'Kunst'

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in HH:mm format (e.g., 14:30)',
  })
  time: string;

  @IsOptional()
  @IsString()
  type?: string;

  // ➕ Neue Geo-Koordinaten Felder
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;
}