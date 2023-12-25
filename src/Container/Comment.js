import React, { useState, useEffect } from 'react';
import { CommentList } from '../Component/CommentList';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSortOrder from '../hooks/useSortOrder';
import CommentForm from '../Component/CommentForm';

const CommentComponent = () => {
    const [comments, setComments] = useState(
        JSON.parse(localStorage.getItem('comments')) || []
    );

    const { sortOrder, toggleSortOrder } = useSortOrder();


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

    return (
        <div className="comment-container">
            <CommentForm
                buttonText="Post"
                initialValues={{ name: '', text: '' }}
                validationPattern={{ name: /\S/, text: /\S/ }}
                onSubmit={(formData) => handleAddComment({ ...formData, timestamp: new Date() })}
            />
            <div className='sort-action'>
                <button className="sort-btn" onClick={toggleSortOrder}>
                    Sort by: Date and Time <FontAwesomeIcon icon={faSort} color='grey' />
                </button>
            </div>
            <CommentList
                comments={[...comments].sort((a, b) => {
                    const timestampA = a?.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp);
                    const timestampB = b?.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp);
            
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