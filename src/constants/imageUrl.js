const PATH_SERVER_IMAGE = process.env.REACT_APP_SERVER_IMAGE;

export const productUrl = (url) => {
  return `${PATH_SERVER_IMAGE}/image_product/${url}.png`
}
