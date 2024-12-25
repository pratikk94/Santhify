import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from '../../../utils/axios';
import { LibraryAPI } from '../endpoints';
import { LibraryResponse, Folder, FileItem } from '../types';

export const useLibrary = (currentFolder: string) => {
  // Queries to fetch public & private data
  const { data: publicLibraryData, isLoading: isPublicLoading, error: publicError, refetch: refetchPublic } = useQuery<LibraryResponse>({
    queryKey: ['public-folder-contents', currentFolder],
    queryFn: async () => {
      const makeRequest = async (retryCount = 0) => {
        try {
          const response = await axiosInstance.get(
            LibraryAPI.GET_FOLDERS('public', currentFolder)
          );
          return {
            ...response.data,
            data: {
              ...response.data.data,
              folders: response.data.data.folders.map((f: Folder) => ({
                ...f,
                isPublic: true,
              })),
              files: response.data.data.files.map((f: FileItem) => ({
                ...f,
                isPublic: true,
              })),
            },
          };
        } catch (error: unknown) {
          const err = error as AxiosError;
          if (err.response?.status === 429 && retryCount < 3) {
            const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return makeRequest(retryCount + 1);
          }
          if (err.response?.status === 401) {
            throw new Error('Unauthorized access. Please check your credentials.');
          }
          throw err;
        }
      };
      return makeRequest();
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const { data: privateLibraryData, isLoading: isPrivateLoading, error: privateError, refetch: refetchPrivate } =
    useQuery<LibraryResponse>({
      queryKey: ['private-folder-contents', currentFolder],
      queryFn: async () => {
        const response: any = await axiosInstance.get(
          LibraryAPI.GET_FOLDERS('private', currentFolder)
        );
        return {
          ...response,
          data: {
            ...response.data.data,
            folders: response.data.data.folders.map((f: Folder) => ({
              ...f,
              isPublic: false,
            })),
            files: response.data.data.files.map((f: FileItem) => ({
              ...f,
              isPublic: false,
            })),
          },
        };
      },
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    });

  const isLoading = isPublicLoading || isPrivateLoading;
  const error = publicError || privateError;

  // Combine and sort folders + files
  const combinedData = {
    folders: [
      ...(publicLibraryData?.data.folders || []),
      ...(privateLibraryData?.data.folders || []),
    ],
    files: [
      ...(publicLibraryData?.data.files || []),
      ...(privateLibraryData?.data.files || []),
    ],
  };

  const refetchAll = () => {
    return Promise.all([refetchPublic(), refetchPrivate()]);
  };

  return {
    combinedData,
    isLoading,
    error,
    refetchAll
  };
}; 