import { IsIn, IsNumber, IsOptional, IsString, Length, Matches, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SORT_DIRECTION } from '../../common/constans/sort-directions.const';

export class RegistrationUserDto {
    @IsString()
    @Length(3, 10)
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Login should have only en. letters, numbers, underscores and hyphens',
    })
    login: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsString()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    email: string;
}

export class UserPaginationQueryDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || null)
    searchLoginTerm?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || null)
    searchEmailTerm?: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || 'createdAt')
    sortBy: string = 'createdAt';

    @IsIn([SORT_DIRECTION.ASC, SORT_DIRECTION.DESC])
    @IsOptional()
    @Transform(({ value }) => value || SORT_DIRECTION.DESC)
    sortDirection: SORT_DIRECTION = SORT_DIRECTION.DESC;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @Transform(({ value }) => (value ? Number(value) : 1))
    pageNumber: number = 1;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @Transform(({ value }) => (value ? Number(value) : 10))
    pageSize: number = 10;
}

// export interface UserPaginationQuery {
//     searchLoginTerm: Nullable<string>;
//     searchEmailTerm: Nullable<string>;
//     sortBy: string;
//     sortDirection: 'asc' | 'desc';
//     pageNumber: number;
//     pageSize: number;
// }
// export type UserPaginationQueryOptional = Partial<UserPaginationQuery>;
