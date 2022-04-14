// dyn.js

import {
  addLike, getLikes, addComment, getComments,
} from './socialApiModule.js';
import { getMeal, getMeal2, cardData } from './mealApiModule.js';

export default class DynGrid {
  header = document.getElementById('Header');

  footer = document.getElementById('Footer');

  dynamicGrid = document.getElementById('dynamicGrid');

  AddLike = addLike;

  GetLikes = getLikes;

  AddComment = addComment;

  GetComments = getComments;

  GetMeal = getMeal;

  Getmeal2 = getMeal2;

  genCard = (i, unqId, imgSrc, foodName) => {
    const id = i + 1;
    const cardContainer = document.createElement('div');
    const cardPic = document.createElement('div');
    const cardPicImg = document.createElement('img');
    cardPicImg.src = `${imgSrc}`;
    const cardMeta = document.createElement('div');
    const cardInfo = document.createElement('div');
    const cardTitle = document.createElement('div');
    cardTitle.innerHTML = `${foodName}`;
    const likeBtn = document.createElement('img');
    likeBtn.src = '../src/icons/like.png';
    likeBtn.alt = 'Like button';
    const likeCounter = document.createElement('div');
    likeCounter.innerHTML = `${id} likes`;
    const commentBtn = document.createElement('div');
    commentBtn.id = `${id}`;
    commentBtn.innerHTML = `Comments: ${id}`;
    const reserveBtn = document.createElement('div');
    reserveBtn.innerHTML = `Res: ${unqId}`;

    cardPic.classList.add('card-pic');
    cardMeta.classList.add('card-meta');
    cardInfo.classList.add('card-info');
    cardTitle.classList.add('card-title');
    likeBtn.classList.add('like-btn');
    likeCounter.classList.add('like-counter');
    commentBtn.classList.add('comment-btn');
    reserveBtn.classList.add('reserve-btn');
    cardContainer.className = 'card-container';
    this.dynamicGrid.className = 'dynamic-grid';

    cardPic.appendChild(cardPicImg);
    cardInfo.appendChild(cardTitle);
    cardInfo.appendChild(likeBtn);
    cardMeta.appendChild(cardInfo);
    cardMeta.appendChild(likeCounter);
    cardMeta.appendChild(commentBtn);
    cardMeta.appendChild(reserveBtn);
    cardContainer.appendChild(cardPic);
    cardContainer.appendChild(cardMeta);
    this.dynamicGrid.appendChild(cardContainer);

    commentBtn.addEventListener('click', () => {
      this.showPopup(i);
    });
  }

  genPopup = (id, unqId, imgSrc, foodName) => {
    this.dynamicGrid.className = 'dynamic-grid-popup';
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-popup';

    const popupInfo = document.createElement('div');
    popupInfo.className = 'popup-info';

    const popupHeader = document.createElement('div');
    popupHeader.className = 'popup-header';

    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.innerHTML = ' ';

    const cardPic = document.createElement('div');
    cardPic.className = 'popup-card-pic';

    const popupImg = document.createElement('img');
    popupImg.src = `${imgSrc}`;
    popupImg.alt = `${foodName}`;

    const popupX = document.createElement('div');
    popupX.className = 'popup-x';
    popupX.innerHTML = 'X';

    const cardMeta = document.createElement('div');
    cardMeta.className = 'card-meta';
    cardMeta.innerHTML = `
    <div class="card-info">
      <h1 class="card-title">${foodName} (${unqId})</h1>
    </div>
    `;

    cardPic.appendChild(popupImg);
    popupHeader.appendChild(empty);
    popupHeader.appendChild(cardPic);
    popupHeader.appendChild(popupX);
    popupInfo.appendChild(popupHeader);
    popupInfo.appendChild(cardMeta);

    const commentList = document.createElement('div');
    commentList.className = 'comment-list';
    commentList.id = 'commentList';
    commentList.innerHTML = `
    <h2 class="comment-counter">Comments (${id})</h2>
    `;

    const commentForm = document.createElement('form');
    commentForm.className = 'comment-form';
    commentForm.innerHTML = `
    <h2 class="comment-counter">Add a comment (${unqId})</h2>
    <label for="newName"></label>
    <input type="text" id="newName" name="newName" required maxlength="30" placeholder="Your name" />
    <label for="newComment"></label>
    <textarea type="text" id="newComment" name="newComment" required maxlength="300" placeholder="Your comment"></textarea>
    <button id="addCommentBtn" type="button" class="btn">Comment</button>
    `;

    cardContainer.appendChild(popupInfo);
    cardContainer.appendChild(commentList);
    cardContainer.appendChild(commentForm);
    this.dynamicGrid.appendChild(cardContainer);

    popupX.addEventListener('click', () => {
      this.showPage();
    });
  }

  showPage = () => {
    this.dynamicGrid.innerHTML = '';
    this.header.className = 'header';
    this.footer.className = 'footer';

    for (let i = 0; i < 6; i += 1) {
      const cardId = i;
      const uniqueId = cardData[i].unqId;
      // const imgSrc = `../src/images/pic${cardId}.jpg`;
      const picSrc = cardData[i].imgSrc;
      const foodName = cardData[i].foodDesc;
      this.genCard(cardId, uniqueId, picSrc, foodName);
    }
  }

  showPopup = (i) => {
    this.dynamicGrid.innerHTML = '';
    this.header.className = 'hide';
    this.footer.className = 'hide';
    const cardId = i + 1;
    const uniqueId = cardData[i].unqId;
    const picSrc = cardData[i].imgSrc;
    const foodName = cardData[i].foodDesc;
    // this.genCardPopup(cardId, uniqueId, picSrc, foodName);
    this.genPopup(cardId, uniqueId, picSrc, foodName);
  }

  hideIt = (item) => {
    item.innerHTML = '';
    item.className = 'zeroSpacing';
    item.classList.add('hide');
  }
}
