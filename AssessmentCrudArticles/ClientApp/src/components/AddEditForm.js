import React from 'react';
import { useFormik } from 'formik';

const AddEditForm = ({onSubmit, values}) => {
  const initialValues = values || {
    id: '',    
    title: '',
    author: '',
    publicationDate: null,
    body: ''
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => {
        onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
        />
        <label htmlFor="author">Author</label>
        <input
            id="author"
            name="author"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.author}
        />
        <label htmlFor="publicationDate">Author</label>
        <input
            id="publicationDate"
            name="publicationDate"
            type="datetime-local"
            onChange={formik.handleChange}
            value={formik.values.publicationDate}
        />
        <label htmlFor="body">Body</label>
        <input
            id="body"
            name="body"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.body}
        />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddEditForm;