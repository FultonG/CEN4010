import React , { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditText = (props) =>{

    const [text, setText] = useState(props.text);
    const [edit, setEdit] = useState(false);

    function handleTextChange(event){
        setText(event.currentTarget.value);
    }

    function handleSubmit(event){
        event.preventDefault();
        props.handleTextChange(text);
        setEdit(false);
    }

    return (
        <React.Fragment>
            {edit ? 
            <Form onSubmit={e => handleSubmit(e)} inline>
                <Form.Control type="text" value={text} onChange={handleTextChange} />
                <Button type="submit">Save</Button>
            </Form>:
            <h2 onClick={() => {setEdit(true)}}>{text}</h2>
        }
        </React.Fragment>
        
        
    )

}

export default EditText;