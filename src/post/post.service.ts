import { Injectable } from '@nestjs/common';
import { IAddPostDto, UpdatePostDto } from './interfaces/input';
import { PromiseNull } from '../common/interfaces/optional.types';
import { PostCommandRepository } from './repositories/post.command.repository';
import { PostDocument } from './post.schema';

@Injectable()
export class PostService {
    constructor(protected postCommandRepository: PostCommandRepository) {}

    async create(dto: IAddPostDto): PromiseNull<PostDocument> {
        return this.postCommandRepository.create(dto);
    }
    async updateById(id: string, dto: UpdatePostDto): Promise<boolean> {
        return this.postCommandRepository.updateById(id, dto);
    }

    async removeById(id: string): Promise<boolean> {
        return this.postCommandRepository.removeById(id);
    }
}
