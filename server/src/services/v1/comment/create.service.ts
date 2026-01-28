import CommentModel from "@models/Comment.model.js";
import type {CommentDB, ServiceResponse} from "@src/types/index.js";
import type {CommentInput} from "@validators/comment.js";

export async function createService(
    commentData: CommentInput
): Promise<ServiceResponse> {
    const newComment = await CommentModel.create(commentData);
    const comment = newComment as CommentDB;

    return {
        status: 201,
        data: {
            ok: true,
            message: "comment created successfully",
            comment: {
                ...commentData,
                _id: undefined,
                __v: undefined,
                id: comment._id.toString(),
                course: comment.course.toString(),
                writer: comment.writer.toString(),
                parentComment: comment.parentComment ? comment.parentComment?.toString() : undefined,
                createdAt: comment.createdAt.toISOString(),
                updatedAt: comment.updatedAt.toISOString(),
            },
        }
    };
}