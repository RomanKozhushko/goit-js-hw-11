function renderGallery (images) {
    const renderImg = images
    .map(img => {
      const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads} = img;
      return`
      <a class="gallery__link" href="${largeImageURL}">
      <div class="gallery-item" id="${id}">
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width ="350" height ="220" />
         <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p lass="info-item"><b>Downloads</b>${downloads}</p>
         </div>
      </div>
    </a>`;
}).join('');

gallery.insertAdjacentHTML('beforeend', renderImg);
}
export {renderGallery}