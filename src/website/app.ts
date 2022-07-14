/* Global Variables */
const imageNameInput = document.getElementById('name') as HTMLFormElement
const imageWidthInput = document.getElementById('width') as HTMLFormElement
const imageHeightInput = document.getElementById('height') as HTMLFormElement
const submitBtn = document.getElementById('resize') as HTMLFormElement
const myLocalServer = 'http://localhost:3000/'
// Create a new date instance dynamically with JS

//Events
submitBtn.addEventListener('click', mainAction)

//Main Fuctions
//
function mainAction() {
  const imageName: string = imageNameInput.value
  const width: string = imageWidthInput.value
  const height: string = imageHeightInput.value
  if (!imageName) {
    alert('Please enter Image Name')
    return false
  }
  if (!width) {
    alert('Please enter Image Width')
    return false
  }
  if (!height) {
    alert('Please enter Image Height')
    return false
  }

  // call post function
  const url = `${myLocalServer}resizeImage?name=${imageName}&width=${width}&height=${height}`
  processData(url)
}

// post the data to the local Server
const processData = async function (url: string) {
  try {
    const request = await fetch(url)
    const data = await request.json()
    if (request.status !== 400 && request.status !== 404) {
      ;(document.getElementById('image') as HTMLImageElement).src =
        '../../src/website/cache/' + data
    } else {
      throw new Error(`${data.error}`)
      return
    }
  } catch (error) {
    alert(error)
  }
}
