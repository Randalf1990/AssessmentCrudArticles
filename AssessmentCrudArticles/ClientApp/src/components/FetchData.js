import React, { useState, useEffect, useMemo } from 'react';
import AddEditForm from './AddEditForm';

const FetchData = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingArticle, setAddingArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState(false);
  const [currentEditingArticle, setCurrentEditingArticle] = useState(null);

  useEffect(() => {
    populateWeatherData();
    setAddingArticle(false);
  }, []);

  const handleRemoveArticle = async (articleId) => {
    await fetch(`http://localhost:5079/api/articles/${articleId}`, { method: 'DELETE' });
    populateWeatherData();
  }

  const handleAddArticle = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
          { 
              title: values.title,
              author: values.author,
              publicationDate: values.publicationDate,
              body: values.body
          })
    };
    await fetch(`http://localhost:5079/api/articles/`, requestOptions);
    populateWeatherData();
    setAddingArticle(false);
  }

  const handleRequestToEditArticle = (article) => {
    setCurrentEditingArticle(article);
    setEditingArticle(true);
  } 

  const handleEditArticle = async (values) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
          { 
              id: values.id,
              title: values.title,
              author: values.author,
              publicationDate: values.publicationDate,
              body: values.body
          })
    };
    await fetch(`http://localhost:5079/api/articles/${values.id}`, requestOptions);
    populateWeatherData();
    setEditingArticle(false);
  }

  const renderForecastsTable = (articles) => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
            <th>Body</th>
            <th><button onClick={() => setAddingArticle(true)}>Add new Article</button></th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article =>
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{article.publicationDate}</td>
              <td>{article.body}</td>
              <td><button onClick={() => handleRemoveArticle(article.id)}>Remove</button></td>
              <td><button onClick={() => handleRequestToEditArticle(article)}>Edit</button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  const populateWeatherData = async () => {
    const response = await fetch('http://localhost:5079/api/articles');
    const data = await response.json();
    setArticles(data);
    setLoading(false);
  }


  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderForecastsTable(articles);

  return (
    <div>
      <h1 id="tabelLabel" >List of articles</h1>
      <p>See the list of articles bellow...</p>
      {contents}
      {!addingArticle || <AddEditForm onSubmit={handleAddArticle} />}
      {!editingArticle || <AddEditForm onSubmit={handleEditArticle} values={currentEditingArticle} />}
    </div>
  );
}

export default FetchData;
