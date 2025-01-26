import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewFolder } from '../redux/reducer';
import { useNavigate } from 'react-router-dom';

const CreateFolder = () => {
    // variable that records the folderName
    // used react hook so that when it is updated, the DOM is reloaded
    const [folderName, setFolderName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // fetch all states from store
    const { folders, isLoading, error } = useSelector((state) => state.data);
    if (isLoading) return <div>Loading Files...</div>;
    if (error) return <div>Error in loading files: {error}</div>;
    
    // handles the submission of the create new folder form
    // prevents the form to reload the page
    // resets the folderName variable
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!folderName) return;
        const newFolderID = folders[folders.length]?.folderID || (folders.length + 1);
        dispatch(addNewFolder({name: folderName}));
        setFolderName("");
        navigate("/folders/view/" + newFolderID);
    };

    return (
        <form className='create-folder-form' onSubmit={handleSubmit}>
            <input
            id="folder-name-input"  
            type="text"
            placeholder="Enter folder name"
            onChange={(e) => setFolderName(e.target.value)}
            />
            <button type="submit">Add Folder</button>
        </form>
        );
}
 
export default CreateFolder;