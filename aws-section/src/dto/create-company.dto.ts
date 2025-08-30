import {
  IsString,
  IsEnum,
  IsArray,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { CompanyType } from '../types/company.types';

export class CreateCompanyDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @IsEnum(CompanyType)
  type!: CompanyType;

  @IsDateString()
  adhesionDate!: string;

  @IsArray()
  @IsString({ each: true })
  transferDates!: string[];
}
