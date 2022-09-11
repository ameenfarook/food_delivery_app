import {ApiContants} from '../contants';

const getFlagIcon = (
  code = 'IN',
  style = ApiContants.COUNTRY_FLAG.STYLE.FLAT,
  size = ApiContants.COUNTRY_FLAG.SIZE[64],
) => `${ApiContants.COUNTRY_FLAG.BASE_URL}/${code}/${style}/${size}.png`;

const getLogo = imageId =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;

const getPoster = (imageId, quality = ApiContants.STATIC_IMAGE.QUALITY.SD) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/poster/${quality}/${imageId}.png`;

const getGalleryImage = (
  imageId,
  size,
  quality = ApiContants.STATIC_IMAGE.QUALITY.SD,
) =>
  `${ApiContants.STATIC_IMAGE.BASE_URL}/gallery/${size}/${quality}/${imageId}.png`;

export default {getFlagIcon, getLogo, getPoster, getGalleryImage};
