const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const button = document.querySelector("[data-action=close-lightbox]");

const createGallery = createCardOfGallery(galleryItems);

function createCardOfGallery(cardItems) { 
    let tabindex = 0;
    return cardItems.map(({ preview, description }) => {
     tabindex += 1;
        return ` <li class="gallery__item"
        tabindex = "${tabindex}"> 
        <a class="gallery__link" href="">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
        </li>`
    }).join("");
}
gallery.insertAdjacentHTML("beforeend", createGallery);

gallery.addEventListener("click", onCardClick);
button.addEventListener("click", onCloseModalClick);
modal.addEventListener("click", onOverlayCloseClick);
window.addEventListener("keydown", onEscClick);
window.addEventListener("keydown", onEnterClick);

function onCardClick(evt) {
    evt.preventDefault();
    const isImage = evt.target.nodeName;
    if (isImage !== "IMG") { return; }
    modal.classList.add("is-open");

    let modalContent = createModalContent(galleryItems);
    
    function createModalContent (galleryItem) {
       return galleryItem.find((item) => { 
           return item.preview === evt.target.src;})
    };
    
    modalImg.src = modalContent.original;
    modalImg.alt = modalContent.description;
}

function onCloseModalClick() { 
    modal.classList.remove("is-open") 
    modalImg.src = "";
    
};

function onOverlayCloseClick(evt) {
    if (evt.target.classList.contains("lightbox__overlay")) { 
    modal.classList.remove("is-open") 
    modalImg.src = "";
    };
};
 
function onEscClick(evt) {
    if (evt.code !== "Escape") { 
        return;
    };
    modal.classList.remove("is-open") 
    modalImg.src = "";
};
 
function onEnterClick(evt) {
    if (evt.code === "Enter" && evt.target.nodeName === "LI") {
        modal.classList.add("is-open");

        let modalContent = createModalContent(galleryItems);
    
        function createModalContent(galleryItem) {
            return galleryItem.find((item) => {
                return item.preview === evt.target.querySelector("img").src;
            })
        };
    
        modalImg.src = modalContent.original;
        modalImg.alt = modalContent.description;
    }
}