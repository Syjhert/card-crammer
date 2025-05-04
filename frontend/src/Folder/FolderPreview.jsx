const FolderPreview = ( {folder, handleViewFolder } ) => {
    return ( 
        <div className="border border-black rounded-lg max-w-[500px] my-2.5 p-1 hover:cursor-pointer hover:border-3 hover:border-customRed hover:text-customRed" onClick={() => handleViewFolder() }>
            <p className="text-lg font-bold p-2">{ folder.name }</p>
        </div>
    );
}

export default FolderPreview