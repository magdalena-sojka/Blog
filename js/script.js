'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}







const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(customSelector);

  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element, get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();







const optArticleTagsSelector = '.post-tags .list';

function generateTags() {

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);

      /* [DONE] generate HTML of the link */

      const tagsLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(tagsLinkHTML);

      /* [DONE] add generated code to html variable */

      html = html + tagsLinkHTML;

      /* END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();




function tagClickHandler(event) {

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log(clickedElement);

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for (let activeTag of activeTags) {

    /* [DONE] remove class active */

    activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [in progress] find all tag links with "href" attribute equal to the "href" constant */

  const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for (let tagLinkHref of tagLinksHref) {
    console.log(tagLinkHref);

    /* [DONE] add class active */

    tagLinkHref.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}




function addClickListenersToTags() {
  /* find all links to tags */

  const allLinksToTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(allLinksToTags);

  /* START LOOP: for each link */

  for (let link of allLinksToTags) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();






const optArticleAuthorSelector = '.post-author .list';

function generateAuthors(){

  /* [DONE] find all articles */
  
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  
  /* [DONE] START LOOP: for every article: */
  
  for (let article of articles) {
  
    /* [DONE] find authors wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

    let html = '';

    /* get authors from authors attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* generate HTML of the link */

    const authorLinkHtml = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
    console.log(authorLinkHtml);

    /* add generated code to html variable */

    html = html + authorLinkHtml;

    /* insert HTML of all the links into the authors wrapper */

    authorWrapper.innerHTML = html;

  }
}
generateAuthors();




function authorClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract author from the "href" constant */

  const tag = href.replace('#author-', '');

  /* find all authors links with class active */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active authors link */

  for(let authorLink of authorLinks) {

    /* remove class active */

    authorLink.classList.remove('active');

  /* END LOOP: for each active authors link */
  }

  /* find all authors links with "href" attribute equal to the "href" constant */

  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found authors link */

  for(let authorLinkHref of authorLinksHref){

    /* add class active */

    authorLinkHref.classList.add('active');

  /* END LOOP: for each found authors link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + tag + '"]');
}



function addClickListenersToAuthors(){
  /* find all links to authors */

  const allLinksToAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(allLinksToAuthors);

  /* START LOOP: for each link */

  for (let link of allLinksToAuthors) {

    /* add authorClickHandler as event listener for that link */

    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();