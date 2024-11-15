export const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export function convertStringToNumber(str: string) {
  const number = Number(str);
  if (isNaN(number)) {
    throw new Error("Invaida Number");
  }
  return number;
}

export const generateImageUrl = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (file && VALID_IMAGE_TYPES.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result); // Return the Base64-encoded string
        } else {
          resolve(null); // Fallback if result is not a string
        }
      };
      reader.onerror = () => reject(null); // Reject in case of error
      reader.readAsDataURL(file); // Read the file as Data URL
    } else {
      resolve(null); // Return null for invalid file types
    }
  });
};
