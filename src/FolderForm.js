import { useState, useEffect } from 'react';

const FolderForm = ({ addFolder }) => {
    // variable that records the folderName
    // used react hook so that when it is updated, the DOM is reloaded
    const [folderName, setFolderName] = useState("");

    // handles the submission of the create new folder form
    // prevents the form to reload the page
    // resets the folderName variable
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!folderName) return;
        addFolder(folderName);
        setFolderName("");
    };

    return (
    <form onSubmit={handleSubmit}>
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
 
export default FolderForm;