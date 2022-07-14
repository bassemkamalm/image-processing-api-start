import resize from '../resize'
const oldFile = ''
const width = 100
const height = 100
const newFile = ''

it('Test my resize class - resize page', async () => {
  const res = await resize(oldFile, width, height, newFile)
  expect(res).not.toBeUndefined()
})
