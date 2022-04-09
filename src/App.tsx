import React, { useEffect, useState } from 'react'
import classes from './styles/BasicClass.module.css'
import { IPost } from './interfaces/BasicInterfaces'
import { GetRequest } from './http/HttpAxiosGet'
import { AxiosResponse } from 'axios'

const App = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        GetRequest('https://jsonplaceholder.typicode.com/posts')
            .then((res: AxiosResponse) => {
                setPosts(res.data)
                setLoading(false)
            })
            .catch((ex) => {
                const error = 'Не удалось загрузить данные'
                setError(error)
                setLoading(false)
            })
    }, [])

    return (
        <div className={classes.Catalog}>
            <ul className="posts">
                <table className={classes.Block}>
                    {posts.map((post: IPost) => (
                        <tr key={post.product_id}>
                            <td></td>
                            <td className={classes.Image}></td>
                            <td></td>
                        </tr>
                    ))}
                </table>
            </ul>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default App

{
    /*<div>*/
}
{
    /*    <img key={post.product_id} src='./images/jacket.jpg'/>*/
}
{
    /*    <h3>{post.name}</h3>*/
}
{
    /*    <p>{post.initial_price}</p>*/
}
{
    /*</div>*/
}
