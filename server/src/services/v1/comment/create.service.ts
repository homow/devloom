import CommentModel from "@models/Comment.model.js";
import type {CommentInput} from "@validators/comment.js";
import type {ServiceResponse} from "@src/types/index.js";
import {checkCourseExist} from "@services/v1/course/index.js";
import {commentProjectStage, commentWithParentStage, createPipelineStage} from "@src/aggregations/index.js";

/** inject comment in db */
export async function createService(
    commentData: CommentInput & { writer: string },
): Promise<ServiceResponse> {
    const course = await checkCourseExist({id: commentData.course});

    /** if not Exist course */
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
        /** create Pipeline Stage for comment */
        const commentStage = createPipelineStage({
            filter: [{_id: newComment._id}],
            stage: newComment.isReply ? commentWithParentStage : commentProjectStage,
        });

        /** get comment and populated all data with Pipeline */
        const [comment] = await CommentModel.aggregate(commentStage);

        return {
            status: 201,
            data: {
                ok: true,
                message: "comment created successfully",
                comment
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