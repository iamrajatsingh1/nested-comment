import React, { useState } from 'react';
import '../App.css';
import { getCustomDate } from '../utils/date';
import EditCommentForm from './EditCommentForm';
import ReplyCommentForm from './ReplyCommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const Comment = ({ comment, onEdit, onDelete, onReply }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const [isReplying, setReplying] = useState(false);
    // eslint-disable-next-line
    const [replyOptions, setReplyOptions] = useState(false);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        onEdit(comment.id, editedText);
        setEditing(false);
    };

    const handleDelete = () => {
        onDelete(comment.id);
    };

    const handleReply = () => {
        setReplying(true);
        setReplyOptions(true);
    };

    const handleCancelReply = () => {
        setReplying(false);
        setReplyOptions(false);
    };

    const handleReplySave = (data) => {
        onReply(comment.id, data.name, data.comment);
        setReplying(false);
        setReplyOptions(false);
    };

    return (
        <div>
            <div className="comment">
                <div className="comment-info">
                    <span className='comment-user-name'>{comment.name}</span>
                    <span>{getCustomDate(comment.timestamp)}</span>
                </div>
                {isEditing ? (
                    <EditCommentForm
                        value={editedText}
                        onCancel={() => setEditing(false)}
                        onChange={setEditedText}
                        onSubmit={handleSave}
                    />
                ) : (
                    <div>
                        <p className='text-align-left'>{comment.text}</p>
                        <div className='form-base-actions'>
                            <button onClick={handleReply}>Reply</button>
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                        <FontAwesomeIcon icon={faTrash} color='grey' className="delete-btn" onClick={handleDelete} />
                    </div>
                )}
            </div>
            {isReplying && (
                <div className='margin-left'>
                    <ReplyCommentForm
                        onReplySave={handleReplySave}
                        onReplyCancel={handleCancelReply}
                    />
                </div>
            )}
            {comment.replies && comment.replies.length > 0 && (
                <div className="margin-left">
                    {comment.replies.map((reply) => (
                        <Comment
                            key={reply.id}
                            comment={reply}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onReply={onReply}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const CommentList = ({ comments, onEdit, onDelete, onReply }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReply={onReply}
                />
            ))}
        </div>
    );
};
