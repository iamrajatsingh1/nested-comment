import React from 'react';
import useForm from '../hooks/useForm';
import '../App.css';

const CommentForm = ({ label = "Comment", onSubmit, onCancelClick, buttonText, initialValues, validationPattern }) => {

    const { formState, handleInputChange, resetForm, isValid } = useForm(initialValues, validationPattern);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid()) {
            onSubmit(formState);
            resetForm();
        } else {
            alert('Invalid input. Please fill all required fields.');
        }
    };

    return (
        <form className='comment-form' onSubmit={handleSubmit}>
            <label>{label}</label>

            <input
                type="text"
                required={true}
                placeholder='Name'
                name={"name"}
                value={formState.name}
                onChange={handleInputChange}
            />

            <textarea
                required={true}
                placeholder='Comment'
                name='text'
                value={formState.text}
                onChange={handleInputChange}
            />


            <div className='form-base-actions'>
                <button type="submit">{buttonText}</button>
                {onCancelClick && <button onClick={onCancelClick}>Cancel</button>}
            </div>
        </form>
    );
};

export default CommentForm;
