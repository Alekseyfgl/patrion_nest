import { Nullable } from '../../../common/interfaces/optional.types';
import { IsIn, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SORT_DIRECTION } from '../../../common/constans/sort-directions.const';

export class AddBlogDto {
    @IsString()
    @Length(1, 15)
    name: string;

    @IsString()
    @Length(1, 500)
    description: string;

    @IsString()
    @Length(1, 100)
    websiteUrl: string;
}

export class UpdateBlogDto {
    @IsString()
    @Length(1, 15)
    name: string;

    @IsString()
    @Length(1, 500)
    description: string;

    @IsString()
    @Length(1, 100)
    websiteUrl: string;
}

export class BlogQuery {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value || null)
    searchNameTerm: Nullable<string> = null;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || 'createdAt')
    sortBy: string = 'createdAt';

    @IsIn([SORT_DIRECTION.ASC, SORT_DIRECTION.DESC])
    @IsOptional()
    @Transform(({ value }) => value || SORT_DIRECTION.DESC)
    sortDirection: SORT_DIRECTION = SORT_DIRECTION.DESC;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    @Transform(({ value }) => (value ? Number(value) : 1))
    pageNumber: number = 1;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Type(() => Number) //if there is a value convert to number
    @Transform(({ value }) => (value ? Number(value) : 10)) // if there is a field without value, set value = 10
    pageSize: number = 10; // if there is not a field, set 10
}
