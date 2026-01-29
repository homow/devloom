import CommentModel from "@models/Comment.model.js";
import type {CommentInput} from "@validators/comment.js";
import type {ServiceResponse} from "@src/types/index.js";
import {commentProjectStage, commentWithParentStage, createPipelineStage} from "@src/aggregations/index.js";
import {checkCourseExist} from "@services/v1/course/index.js";

/** inject comment in db */
export async function createService(
    commentData: CommentInput & { writer: string },
): Promise<ServiceResponse> {
    const course = await checkCourseExist({id: commentData.course});

    if (!course) return {
        status: 404,
        data: {
            ok: false,
            message: "course not found",
            code: "COURSE_NOT_FOUND",
        }
    };

    const newComment = await CommentModel.create(commentData);

    if (newComment) {
        const commentStage = createPipelineStage({
            filter: [{_id: newComment._id}],
            stage: newComment.isReply ? commentWithParentStage : commentProjectStage,
        });

        const comment = await CommentModel.aggregate(commentStage);

        console.log(comment);

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
                pipeline: comment
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