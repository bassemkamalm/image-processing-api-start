//import sharp - i will use to resize the images
import sharp from 'sharp'
// import file-identity module to validate the file type

// main resize function
async function resize(
  oldFile: string,
  width: number,
  height: number,
  newFile: string
): Promise<string> {
  //resize image
  try {
    await sharp(oldFile).resize(width, height).toFile(newFile)
    return 'ok'
  } catch (error) {
    return `error ${error}`
  }
}

export default resize
