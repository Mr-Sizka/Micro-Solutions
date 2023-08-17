export const onImageEdit = async (imgUrl) => {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "profileImage.jpg", {
        type: blob.type,
    });
    return file;
}