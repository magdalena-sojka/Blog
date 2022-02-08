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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.list.authors';


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


function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [DONE] create a new variable allTags with an empty object */
  let allTags = {};
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
      /* [DONE] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [DONE] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
  }
  /* [DONE] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [DONE] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  /* [DONE] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [DONE] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
  }
  /* [DONE] END LOOP: for each tag in allTags: */

  /* [DONE] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
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
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    console.log(tagLink);
    /* [DONE] add class active */
    tagLink.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* [DONE] find all links to tags */
  const allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allLinksToTags);
  /* [DONE] START LOOP: for each link */
  for (let link of allLinksToTags) {
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();



function calculateAuthorsParams(authors) {
  const params = { max: 0, min: 999999 };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}


function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}


function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {
    /* [DONE] find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get authors from authors attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);
    /* [DONE] generate HTML of the link */
    const authorLinkHtml = '<p class="post-author">by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></p>';
    console.log(authorLinkHtml);
    /* [DONE] add generated code to html variable */
    html = html + authorLinkHtml;
    /* [NEW] add generated code to allAuthors object */
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
    /* [DONE] add generated code to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* [DONE] END LOOP: for each tag */
    /* [DONE] insert HTML of all the links into the authors wrapper */
    authorWrapper.innerHTML = html;
    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector(optAuthorsListSelector);
    /* [NEW] create variable for all links HTML code */
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);
    let allAuthorsHTML = '';
    /* [NEW] START LOOP: for each authors in allAuthors: */
    for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const link = '<a class="author-size-' + calculateAuthorClass() + '" href="#author-' + author + '">' + author + '</a>';
      allAuthorsHTML += link;
    }
    /* [NEW] END LOOP: for each author in allAuthors: */
    /* [NEW] add html from allTAuthors to authorsList */
    authorsList.innerHTML = allAuthorsHTML;
  }
}
generateAuthors();



function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* [DONE] find all authors links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* [DONE] START LOOP: for each active authors link */
  for (let authorLink of authorLinks) {
    /* [DONE] remove class active */
    authorLink.classList.remove('active');
    /* [DONE] END LOOP: for each active authors link */
  }
  /* [DONE] find all authors links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found authors link */
  for (let authorLinkHref of authorLinksHref) {
    /* [DONE] add class active */
    authorLinkHref.classList.add('active');
    /* [DONE] END LOOP: for each found authors link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */
  const allLinksToAuthors = document.querySelectorAll('a[href^="#author-"]');
  console.log(allLinksToAuthors);
  /* [DONE] START LOOP: for each link */
  for (let link of allLinksToAuthors) {
    /* [DONE] add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToAuthors();