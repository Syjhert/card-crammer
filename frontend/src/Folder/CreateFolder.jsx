import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createFolder } from '../redux/folderSlice';
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
        dispatch(createFolder({name: folderName}));
        setFolderName("");
        navigate("/folders/view/" + newFolderID);
    };

    return (
        <form className='flex flex-col items-center gap-1.5 w-[350px] mx-auto mt-10' onSubmit={handleSubmit}>
            <div>
                <p className="text-2xl font-bold">Create Folder</p>
                <hr className="w-full border-placeholder mt-2"></hr>
            </div>
            <label htmlFor='folder-name-input'>Name</label>
            <input
            id="folder-name-input"
            name='folder-name-input'
            className='w-1/2 h-5 text-center border rounded p-4'
            type="text"
            placeholder="Enter folder name"
            onChange={(e) => setFolderName(e.target.value)}
            />
            <button className='px-2 border border-gray-400 rounded cursor-pointer' type="submit">Add Folder</button>
        </form>
        );
}
 
export default CreateFolder;