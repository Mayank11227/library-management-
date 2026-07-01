"use client";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { Image as ImageIcon, Upload, Trash2, Loader2, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getGalleryImages, uploadGalleryImage, deleteGalleryImage } from "@/services/api";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = async () => {
    try {
      const response = await getGalleryImages();
      if (response.status === 'success') {
        setImages(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery images", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      await uploadGalleryImage(formData);
      fetchImages(); // Refresh the list
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteGalleryImage(id);
      fetchImages(); // Refresh the list
    } catch (error) {
      alert("Failed to delete image.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Image <span className="text-gold">Gallery</span></h1>
          <p className="text-slate-500 font-bold text-sm mt-1">Manage library facility photos and event images.</p>
        </div>
        <div className="flex items-center gap-3">
          <input 
             type="file" 
             ref={fileInputRef} 
             onChange={handleFileChange} 
             accept="image/jpeg, image/png, image/webp" 
             className="hidden" 
          />
          <button 
             onClick={handleUploadClick}
             disabled={uploading}
             className="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl text-sm font-bold shadow-xl shadow-gold/20 hover:scale-105 hover:bg-gold/90 transition-all disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} 
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : images.length === 0 ? (
        <PremiumCard className="p-12 border-dashed border-2 text-center bg-[hsl(var(--background))]">
          <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-black text-primary mb-2">No Images Uploaded</h3>
          <p className="text-sm font-bold text-slate-400 mb-6">Upload photos of your library to display on the public gallery.</p>
          <button onClick={handleUploadClick} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-md hover:bg-gold transition-all">
            <Plus className="w-4 h-4" /> Browse Files
          </button>
        </PremiumCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img) => (
            <PremiumCard key={img.id} className="overflow-hidden group">
              <div className="aspect-[4/3] relative bg-[hsl(var(--background))]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                   src={`http://localhost/LMS/backend/public/${img.file_path}`} 
                   alt="Gallery Image" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   <button 
                      onClick={() => handleDelete(img.id)}
                      className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-xl transition-all hover:scale-110"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Uploaded on {new Date(img.created_at).toLocaleDateString()}
                </p>
              </div>
            </PremiumCard>
          ))}
        </div>
      )}
    </div>
  );
}
