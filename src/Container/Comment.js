import React, { useState, useEffect } from 'react';
import { AddCommentForm } from '../Component/AddCommentForm';
import { CommentList } from '../Component/CommentList';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentComponent = () => {
    const [comments, setComments] = useState(
        JSON.parse(localStorage.getItem('comments')) || []
    );
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const handleAddComment = (comment) => {
        setComments([...comments, { ...comment, id: Date.now() }]);
    };

    const handleEditComment = (id, newText) => {
        const recursiveEdit = (commentsArray) =>
            commentsArray.map((comment) =>
                comment.id === id
                    ? { ...comment, text: newText }
                    : {
                        ...comment,
                        replies: comment.replies
                            ? recursiveEdit(comment.replies)
                            : [],
                    }
            );

        setComments(recursiveEdit(comments));
    };

    const handleReplyComment = (id, name, text) => {
        const recursiveReply = (commentsArray) =>
            commentsArray.map((comment) => {
                if (comment.id === id) {
                    return {
                        ...comment,
                        replies: [
                            ...(comment.replies || []),
                            {
                                id: Date.now(),
                                name: name,
                                text: text,
                                timestamp: new Date(),
                            },
                        ],
                    };
                } else if (comment.replies && comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: recursiveReply(comment.replies),
                    };
                }
                return comment;
            });

        setComments(recursiveReply(comments));
    };

    const handleDeleteComment = (id) => {
        const recursiveDelete = (commentsArray) =>
            commentsArray
                .filter((comment) => comment.id !== id)
                .map((comment) => ({
                    ...comment,
                    replies: comment.replies ? recursiveDelete(comment.replies) : [],
                }));

        setComments((prevComments) => recursiveDelete(prevComments));
    };

    const handleSort = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="comment-container">
            <AddCommentForm onAddComment={handleAddComment} />
            <div className='sort-action'>
                <button onClick={handleSort}>
                    Sort by: Date and Time <FontAwesomeIcon icon={faSort} color='grey' />
                </button>
            </div>
            <CommentList
                comments={[...comments].sort((a, b) => {
                    const timestampA = a?.timestamp instanceof Date ? a.timestamp.getTime() : 0;
                    const timestampB = b?.timestamp instanceof Date ? b.timestamp.getTime() : 0;
                    return sortOrder === 'asc' ? timestampA - timestampB : timestampB - timestampA;
                })}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                onReply={handleReplyComment}
            />
        </div>
    );
};

export default CommentComponent;