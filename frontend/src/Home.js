import FolderPreview from './Folder/FolderPreview';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'

const Home = () => {
    const { folders, isLoading, error } = useSelector((state) => state.data);
    const navigate = useNavigate();

    if (isLoading) return <div>Loading Files...</div>;
    if (error) return <div>Error in loading files: {error}</div>;
    

    return (
        <div className="Home">
            <h1>Your Folders</h1>
            <div className="folder-preview-cont">
                { folders.map((folder) => {
                    return <FolderPreview 
                        key={folder._id}
                        folder={folder}
                        handleViewFolder={ () => { navigate("folders/view/" + folder._id) } }
                    />
                }) }
            </div>
        </div>
    );
}
 
export default Home;