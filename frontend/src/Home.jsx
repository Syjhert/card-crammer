import FolderPreview from './Folder/FolderPreview';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { folders, isLoading, error } = useSelector((state) => state.data);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
    }, []);

    if (isLoading) return <div>Loading Files...</div>;
    if (error) return <div>Error in loading files: {error}</div>;
    

    return (
        <div className="Home w-1/2 flex flex-col items-center gap-2 mt-5">
            <h1 className='text-2xl font-bold'>Your Folders</h1>
            <div className="w-[90%] max-w-[500px] mx-auto my-2.5">
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