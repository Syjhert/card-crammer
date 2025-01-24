const FolderPreview = ( {folder, setShowingFolder, setFolderID} ) => {
    return ( 
        <div className="folder-preview" onClick={()=>{setShowingFolder(true); setFolderID(folder.id); }}>
            <h4>{ folder.name }</h4>
        </div>
    );
}
 
export default FolderPreview;