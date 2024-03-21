import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CommentQueryRepository } from './repositories/comment.query.repository';
import { IComment } from './interfaces/output';
import { Nullable } from '../common/interfaces/optional.types';
import { ExceptionsService } from '../common/http-exceptions-service/exeption.service';

@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentQueryRepository: CommentQueryRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') commentId: string) {
        const commentWithAuthor: Nullable<IComment> = await this.commentQueryRepository.getCommentByIdWithAuthor(commentId);
        if (!commentWithAuthor) throw this.exceptionsService.notFoundException();
        return commentWithAuthor;
    }

    // async update(req: Request<{ id: string }>, res: Response) {
    //     const commentId = req.params.id;
    //     const userId: Optional<string> = req?.user?.userId;
    //     if (!userId) return new ApiResponse(res).notAuthorized();
    //
    //     const result: HttpStatusCodes = await CommentService.update(req.body, commentId, userId);
    //     const response = new ApiResponse(res);
    //
    //     switch (result) {
    //         case HttpStatusCodes.NO_CONTENT:
    //             return response.send(HttpStatusCodes.NO_CONTENT);
    //         case HttpStatusCodes.FORBIDDEN:
    //             return response.send(HttpStatusCodes.FORBIDDEN, new ErrorCreator().add(HttpExceptionMessages.FORBIDDEN, 'content'));
    //         case HttpStatusCodes.NOT_FOUND:
    //             return response.notFound();
    //         default:
    //             return response.notFound();
    //     }
    // }
    // async delete(req: Request<{ id: string }>, res: Response) {
    //     const commentId = req.params.id;
    //     const userId: Optional<string> = req?.user?.userId;
    //     if (!userId) return new ApiResponse(res).notAuthorized();
    //
    //     const result: HttpStatusCodes = await CommentService.delete(commentId, userId);
    //     const response = new ApiResponse(res);
    //
    //     switch (result) {
    //         case HttpStatusCodes.NO_CONTENT:
    //             return response.send(HttpStatusCodes.NO_CONTENT);
    //         case HttpStatusCodes.FORBIDDEN:
    //             return response.send(HttpStatusCodes.FORBIDDEN, new ErrorCreator().add(HttpExceptionMessages.FORBIDDEN, 'content'));
    //         case HttpStatusCodes.NOT_FOUND:
    //             return response.notFound();
    //         default:
    //             return response.notFound();
    //     }
    // }
}
