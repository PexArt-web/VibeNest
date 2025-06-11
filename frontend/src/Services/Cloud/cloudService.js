const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL;

export const uploadImageToCloud = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pex_unsigned_preset");
        
        const response = await fetch(`${cloudUrl}`, {
            method: "POST",
            body: formData,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`${data?.error?.message} : Failed to upload image to cloudinary`);
        }
        
        return data.secure_url; 
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error(`${error?.message == "Failed to fetch" ? "Error Posting your Vibes , check your connection and try again" : error?.message} `);
    }
}