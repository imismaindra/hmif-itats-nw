import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getUserFromToken } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    // Check authentication - try cookie first, then Authorization header
    let token = request.cookies.get('auth-token')?.value;

    // If no cookie token, try Authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    console.log('Upload token:', token ? 'present' : 'missing');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const { verifyToken } = await import('@/lib/auth');
    const user = verifyToken(token);
    console.log('Upload user:', user ? user.username : 'null');

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'
      }, { status: 400 });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 5MB.'
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${randomString}.${extension}`;

    // Create uploads directory structure if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    const categoryDir = category ? join(uploadsDir, category) : uploadsDir;

    try {
      await mkdir(categoryDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = join(categoryDir, filename);
    await writeFile(filePath, buffer);

    // Return the public URL
    const fileUrl = category ? `/uploads/${category}/${filename}` : `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
      filename: filename,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
