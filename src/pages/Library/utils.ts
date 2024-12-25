import { FileType } from './types';

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) resolve(e.target.result as string);
      else reject('File could not be read.');
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const getFileType = (mimeType: string): FileType => {
  if (mimeType.includes('audio')) return 'AUDIO';
  if (mimeType.includes('video')) return 'VIDEO';
  if (mimeType.includes('image')) return 'IMAGE';
  if (mimeType.includes('msword') || mimeType.includes('wordprocessingml')) return 'WORD_DOCUMENT';
  if (mimeType.includes('text/plain')) return 'TEXT';
  if (mimeType.includes('pdf')) return 'PDF';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PPT';
  return 'TEXT';
}; 