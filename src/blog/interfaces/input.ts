import { Nullable } from '../../common/interfaces/optional.types';
import { IsIn, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SORT_DIRECTION } from '../../common/constans/sort-directions.const';

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
    searchNameTerm: Nullable<string>;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value || 'createdAt')
    sortBy: string;

    @IsIn([SORT_DIRECTION.ASC, SORT_DIRECTION.DESC])
    @IsOptional()
    @Transform(({ value }) => value || SORT_DIRECTION.DESC)
    sortDirection: SORT_DIRECTION;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @Transform(({ value }) => (value ? Number(value) : 1))
    pageNumber: number;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    @Transform(({ value }) => (value ? Number(value) : 10))
    pageSize: number;
}
