import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SORT_DIRECTION } from '../../../common/constans/sort-directions.const';

export class AddCommentDto {
    @IsString()
    content: string;
}

export class UpdateCommentDto {
    @IsString()
    content: string;
}

export class CommentsByPostQuery {
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
