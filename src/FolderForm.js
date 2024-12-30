import { useState } from 'react';

const FolderForm = ({ addFolder }) => {
    const [folderName, setFolderName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const folderNameInput = document.getElementById("folder-name-input");
        setFolderName(folderName.val());
        if (!folderName) return;
        addFolder( folderName );
        setFolderName("");
    };

    return (
    <form onSubmit={handleSubmit}>
        <input
        id="folder-name-input"  
        type="text"
        placeholder="Enter folder name"
        />
        <button type="submit">Add Folder</button>
    </form>
    );
}
 
export default FolderForm;