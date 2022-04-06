import React, {useEffect, useState} from 'react';
import './App.css';
import axios, {AxiosResponse, CancelTokenSource} from 'axios'

interface IPost {
  product_id: number;
  userId?: number;
  title: string;
  body: string;
}

const defaultPosts: IPost[] = []

const App = () => {

    const [posts, setPosts] = React.useState<IPost[]>(defaultPosts);

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState(
      ''
  );

  const cancelToken = axios.CancelToken; //create cancel token
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = React.useState(cancelToken.source());

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('User cancelled operation');
    }
  };


  useEffect(() => {
    axios
        .get('https://artisant.io/api/products', {
          cancelToken: cancelTokenSource.token,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        })
        .then((res) => res.data)
        .then((response) =>
            {
            setPosts(response.data);
            setLoading(false);}
        )
        .catch((ex) => {
          let error = axios.isCancel(ex)
              ? 'Request Cancelled'
              : ex.code === 'ECONNABORTED'
                  ? 'A timeout has occurred'
                  : ex.response.status === 404
                      ? 'Resource Not Found'
                      : 'An unexpected error has occurred';

          setError(error);
          setLoading(false);
        });
  }, []);

  return (
      <div className="App">
        {loading && <button onClick={handleCancelClick}>Cancel</button>}
        <ul className="posts">
          {posts.map((post: IPost) => (
              <li key={post.product_id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
          ))}
        </ul>
        {error && <p className="error">{error}</p>}
      </div>
  );
}

export default App;
