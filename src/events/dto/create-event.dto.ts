export class CreateEventDto {
  name!: string;
  type!: string;
  participants!: number;
  time!: string;
  date!: string;
  position!: [number, number];
}