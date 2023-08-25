// import { City } from "@project/shared/app-types";
// import { ArrayMaxSize, IsDateString, IsEnum, IsMongoId, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
// import { ABOUT_INFO_LENGTH, NAME_LENGTH, PASSWORD_LENGTH, SPECIALIZATION_COUNT } from "../profile.constants";
// import { Transform } from "class-transformer";
// import dayjs from "dayjs";

// export default class UpdateUserDTO {

//   @IsOptional()
//   @MinLength(NAME_LENGTH.MIN)
//   @MaxLength(NAME_LENGTH.MAX)
//   public name?: string;

//   @IsOptional()
//   @MinLength(PASSWORD_LENGTH.MIN)
//   @MaxLength(PASSWORD_LENGTH.MAX)
//   public password?: string;

//   @IsOptional()
//   @MinLength(PASSWORD_LENGTH.MIN)
//   @MaxLength(PASSWORD_LENGTH.MAX)
//   public newPassword?: string;

//   @IsOptional()
//   @MaxLength(ABOUT_INFO_LENGTH.MAX)
//   public aboutInfo?: string;

//   @IsOptional()
//   @IsDateString()
//   @Transform(({value}) => {
//     return value ? dayjs(value).toDate() : value
//   })
//   birthDate?: Date;

//   @IsOptional()
//   @IsMongoId()
//   public avatar?: string;

//   @IsOptional()
//   @ArrayMaxSize(SPECIALIZATION_COUNT.MAX)
//   @IsString({each:true})
//   public specialization?: string[];

//   @IsOptional()
//   @IsEnum(City)
//   public city?: City;
// }
