import CommentModel from "@models/Comment.model.js";
import type {CommentInput} from "@validators/comment.js";
import type {ServiceResponse} from "@src/types/index.js";

/** inject comment in db */
export async function createService(
    commentData: CommentInput
): Promise<ServiceResponse> {
    const newComment = await CommentModel.create(commentData);

    if (newComment) {
        /** populated data */
        const safeComment = await newComment.populate(['writer', 'course', 'parentComment']);

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

    return {
        status: 500,
        data: {
            ok: false,
            message: "Internal Server Error",
        }
    };
}