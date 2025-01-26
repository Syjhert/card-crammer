const FolderPreview = ( {folder, handleViewFolder } ) => {
    return ( 
        <div className="folder-preview" onClick={() => handleViewFolder() }>
            <h4>{ folder.name }</h4>
        </div>
    );
}

export default FolderPreview