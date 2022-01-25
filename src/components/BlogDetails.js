import {useHistory, useParams} from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const {id} = useParams();
    const {data: singleBlog, isPending} = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        })
        .then(() => {
            history.push('/');
        })
    }


    return ( 
        <div className="blog-details">
           {isPending && <div>Loading...</div>}
           {singleBlog && (
               <article>
                   <h1> {singleBlog.title}</h1>
                   <h3> Written by {singleBlog.author}</h3>
                   <div>{singleBlog.body}</div>
                   <button onClick={handleClick}>Delete</button>
               </article>
           )}
        </div>
     );
}
 
export default BlogDetails;