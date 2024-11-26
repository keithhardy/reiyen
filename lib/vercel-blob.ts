import { del, put } from '@vercel/blob';

async function saveFile(fileData: string | Buffer, fileName: string): Promise<string> {
  try {
    const binaryData =
      typeof fileData === 'string'
        ? Buffer.from(fileData.replace(/^data:.+;base64,/, ''), 'base64')
        : fileData;

    const blob = await put(fileName, binaryData, { access: 'public' });
    return blob.url;
  } catch {
    throw new Error('File upload failed');
  }
}

export async function deleteFile(fileUrl: string): Promise<void> {
  try {
    const blobName = new URL(fileUrl).pathname.slice(1);
    await del(blobName);
  } catch {
    throw new Error('File deletion failed');
  }
}

export async function uploadFile(
  newFile?: string,
  filePrefix: string = 'uploaded-file'
): Promise<string | undefined> {
  if (newFile === '') {
    return undefined;
  }

  if (!newFile) {
    return undefined;
  }

  try {
    const fileExtension = newFile.match(/data:(.*?);base64/)?.[1]?.split('/')[1] || 'unknown';

    const fileName = `${filePrefix}-${Date.now()}.${fileExtension}`;

    const uploadedFileUrl = await saveFile(newFile, fileName);

    return uploadedFileUrl;
  } catch {
    throw new Error('Failed to upload the new file.');
  }
}

export async function updateFile(
  newFile?: string,
  currentFile?: string,
  filePrefix: string = 'uploaded-file'
): Promise<string | undefined> {
  if (newFile === '') {
    if (currentFile && currentFile.includes('blob.vercel-storage.com')) {
      await deleteFile(currentFile);
    }
    return undefined;
  }

  if (!newFile) {
    return currentFile;
  }

  if (newFile === currentFile) {
    return currentFile;
  }

  try {
    const fileExtension = newFile.match(/data:(.*?);base64/)?.[1]?.split('/')[1] || 'unknown';

    const fileName = `${filePrefix}-${Date.now()}.${fileExtension}`;

    const uploadedFileUrl = await saveFile(newFile, fileName);

    if (currentFile && currentFile.includes('blob.vercel-storage.com')) {
      await deleteFile(currentFile);
    }

    return uploadedFileUrl;
  } catch {
    throw new Error('Failed to upload the new file.');
  }
}
