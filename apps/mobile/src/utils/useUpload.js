import * as React from 'react';
import { UploadClient } from '@uploadcare/upload-client'
const client = new UploadClient({ publicKey: process.env.EXPO_PUBLIC_UPLOADCARE_PUBLIC_KEY });

function useUpload() {
  const [loading, setLoading] = React.useState(false);
  const upload = React.useCallback(async (input) => {
    try {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return a dummy URL
      return {
        url: "https://dummy-url.com/image.jpg",
        mimeType: "image/jpeg",
      };
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        return { error: uploadError.message };
      }
      if (typeof uploadError === "string") {
        return { error: uploadError };
      }
      return { error: "Upload failed" };
    } finally {
      setLoading(false);
    }
  }, []);

  return [upload, { loading }];
}

export { useUpload };
export default useUpload;
