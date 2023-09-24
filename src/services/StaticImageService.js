import { ApiContants } from "../constants";

const getLogo = (imageId) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;

const getPoster = (imageId, quality = ApiContants.STATIC_IMAGE.QUALITY.SD) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/poster/${quality}/${imageId}.png`;

const getGalleryImage = (
  imageId,
  size,
  quality = ApiContants.STATIC_IMAGE.QUALITY.SD
) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/gallery/${size}/${quality}/${imageId}.png`;

export default { getLogo, getPoster, getGalleryImage };
