//convert image via cloudinary

export async function imageToURL(image)
{
  //creates new form
  const formEntry = new FormData();

  //appends required parameters for cloudinary
  formEntry.append("file", image);
  formEntry.append("upload_preset", "ml_default")

  //makes a post request to cloudinary
  const testCloud = await fetch("https://api.cloudinary.com/v1_1/dqjcgnqgt/upload", {
    method : "POST",
    body : formEntry
  })
  const newUrl = (await testCloud.json()).url;
  console.log("this is new url", newUrl);
  return newUrl;

}