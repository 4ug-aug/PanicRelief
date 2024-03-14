import { DragEvent, useState, useEffect } from "react";
import { Text } from '@radix-ui/themes';


const text_style = {
    color: 'white',
    fontSize: '24px',
};

const hover_effect = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: 'white',
    fontSize: '24px',
    border: '0.2rem dashed',
};

const image_style = { 
    width: 100, 
    height: 100, 
    objectFit: "cover" as const,
    borderRadius: 10,
};

interface imageUploadProps {
     onFiles: (files: File[]) => void;
     onRemove: (index: number) => void;
}

export default function FileDrop({ onFiles, onRemove }: imageUploadProps) {
  const [isOver, setIsOver] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Listen for paste events


  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);

    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    onFiles(droppedFiles);

    // Optionally handle file processing here
  };

  useEffect(() => {
    // Convert these handlers to handle the entire document
    const handleDragOverDoc = (event: DragEvent) => {
      event.preventDefault();
      setIsOver(true);
    };

    const handleDragLeaveDoc = (event: DragEvent) => {
      event.preventDefault();
      setIsOver(false);
    };

    const handleDropDoc = (event: DragEvent) => {
      event.preventDefault();
      setIsOver(false);

        // Fetch the files
        const droppedFiles = Array.from(event.dataTransfer.files).filter(file =>
        file.type.startsWith("") // Ensure we're only processing image files
      );

        // Process each file
        droppedFiles.forEach(file => {
            const reader = new FileReader();
    
            reader.onloadend = () => {
            // Add the image URL to our array for previewing
            setImagePreviews(prev => [...prev, reader.result as string]);
            };
    
            reader.readAsDataURL(file);
        });

        onFiles(droppedFiles);
    };

    // Add event listeners to the document
    document.addEventListener('dragover', handleDragOverDoc as any);
    document.addEventListener('dragleave', handleDragLeaveDoc as any);
    document.addEventListener('drop', handleDropDoc as any);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener('dragover', handleDragOverDoc as any);
      document.removeEventListener('dragleave', handleDragLeaveDoc as any);
      document.removeEventListener('drop', handleDropDoc as any);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    onRemove(index);
  }
return (
    <div>
    <div
        style={{
            display: isOver ? "flex" : "none", // Show the drop indication only when dragging over
            justifyContent: "center",
            alignItems: "center",
            height: "95vh", // Adjust the height to make the zone smaller
            width: "95vw", // Adjust the width to make the zone smaller
            position: "fixed",
            top: "2.5vh",
            left: "2.5vw",
            zIndex: 9999,
            ...hover_effect,
        }}
    >
        {isOver && <Text style={text_style}>Drop files anywhere to upload</Text>}
    </div>
    <div style={{ display: "flex", gap: '1rem', flexWrap: "wrap" }}>
    {imagePreviews.map((image, index) => (
          <div key={index} className="image-preview-container">
            <img src={image} alt={`Preview ${index}`} className="image-preview" 
            onClick={() => removeImage(index)}/>
            {/* <TrashIcon
              className="remove-icon"
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
}