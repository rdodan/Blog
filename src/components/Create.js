import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Robert');
    const [isPending, setIsPending] = useState(false);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeBody = (e) => {
        setBody(e.target.value);
    };

    const onChangeAuthor = (e) => {
        setAuthor(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setIsPending(true);
        
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        })
        .then(() => {
            console.log('New blog created!');
            setIsPending(false);
        })
        .catch((err) => console.log(err));

        window.location ="/";
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                type="text"
                required
                onChange={onChangeTitle}
                value={title}
                />
                <label>Blog body:</label>
                <textarea
                required
                value={body}
                onChange={onChangeBody}>

                </textarea>
                <label>Blog author:</label>
                <select
                value={author}
                onChange={onChangeAuthor}
                >
                    <option value="Mario">Mario</option>
                    <option value="Robert">Robert</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button>Loading...</button>}
            </form>
        </div>
     );
}
 
export default Create;