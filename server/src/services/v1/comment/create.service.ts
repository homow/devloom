import CommentModel from "@models/Comment.model.js";
import type {CommentInput} from "@validators/comment.js";
import type {CommentDB, ServiceResponse} from "@src/types/index.js";

export async function createService(
    commentData: CommentInput
): Promise<ServiceResponse> {
    const newComment = await CommentModel.create(commentData) as CommentDB;

    return {
        status: 201,
        data: {
            ok: true,
            message: "comment created successfully",
            comment: {
                ...newComment,
                _id: undefined,
                __v: undefined,
                id: newComment._id.toString(),
                course: newComment.course.toString(),
                writer: newComment.writer.toString(),
                parentComment: newComment.parentComment ? newComment.parentComment?.toString() : undefined,
                createdAt: newComment.createdAt.toISOString(),
                updatedAt: newComment.updatedAt.toISOString(),
            },
        }
    };
}