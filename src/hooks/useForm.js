import { useState } from 'react';

const useForm = (initialValues, validationPattern = {}) => {
    const [formState, setFormState] = useState(initialValues);

    const handleInputChange = (e) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const resetForm = () => {
        setFormState(initialValues);
    };

    const isValid = () => {
        for (const key in validationPattern) {
            if (formState[key].trim() === '' || !validationPattern[key].test(formState[key])) {
                return false;
            }
        }
        return true;
    };

    return { formState, handleInputChange, resetForm, isValid };
};

export default useForm;
