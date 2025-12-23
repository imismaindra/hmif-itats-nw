'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import Image from 'next/image';

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  placeholder?: string;
}

export function FileUpload({
  value,
  onChange,
  className,
  accept = "image/*",
  maxSize = 5,
  placeholder = "Pilih gambar..."
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`File terlalu besar. Maksimal ${maxSize}MB.`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diperbolehkan.');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: token ? {
          'Authorization': `Bearer ${token}`,
        } : {},
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();
      onChange(result.url);
      setPreviewUrl(result.url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload gambar. Silakan coba lagi.');
      setPreviewUrl(value || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative">
          <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={cn(
            "w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-colors hover:border-gray-400 flex flex-col items-center justify-center space-y-2",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-600 text-center">
                {placeholder}
              </p>
              <p className="text-xs text-gray-400">
                Maksimal {maxSize}MB
              </p>
            </>
          )}
        </div>
      )}

      {!previewUrl && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Mengupload...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Pilih Gambar
            </>
          )}
        </Button>
      )}
    </div>
  );
}
