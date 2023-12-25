import React, { useState } from 'react';
import '../App.css';
import { getCustomDate } from '../utils/date';
import EditCommentForm from './EditCommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CommentForm from './CommentForm';


const Comment = ({ comment, onEdit, onDelete, onReply }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const [isReplying, setReplying] = useState(false);

    const handleSave = () => {
        onEdit(comment.id, editedText);
        setEditing(false);
    };

    const handleReplySave = (data) => {

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
                        <div className='form-base-actions-parent'>
                            <button onClick={() => setReplying(true)}>Reply</button>
                            <button onClick={() => setEditing(true)}>Edit</button>
                        </div>
                        <FontAwesomeIcon icon={faTrash} color='grey' className="delete-btn" onClick={() => onDelete(comment.id)} />
                    </div>
                )}
            </div>
            {isReplying && (
                <div className='margin-left'>
                    <CommentForm
                        label='Reply'
                        buttonText="Submit Reply"
                        initialValues={{ name: '', text: '' }}
                        validationPattern={{ name: /\S/, text: /\S/ }}
                        onSubmit={(formData) => {
                            onReply(comment.id, formData.name, formData.text);
                            setReplying(false);
                        }}
                        onCancelClick={() => {
                            setReplying(false);
                        }}
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
