import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoaderPost from "../components/LoaderPost";
import { InlineFollowButtons, InlineShareButtons } from "sharethis-reactjs";
import LatestNews from "../components/LatestNews";
import Flashscore from "../components/Flashscore";
import AdComponent from "../components/AdComponent";
import findPath from "../hooks-and-funcs/FindPath";
import scrollToTop from "../hooks-and-funcs/ScrollToTop";
import postDate from "../hooks-and-funcs/postDate";
import MoreFromAuthor from "../components/MoreFromAuthorAndRelated";
import BreadCrumbs from "../components/BreadCrumbs";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previous, setPrevious] = useState('');
  const [next, setNext] = useState('');
  const contentRef = useRef(null);

  const youtubeSeries = 'https://www.youtube.com/embed/videoseries?si=so4FVKgg8VUv3xc4&amp;list=PLMxONK1QhCuZIU86bgmfZUghOF6qBKnT7'
  
  const getYoutubeVideoId = (link) => {

    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get('v');

  };

  const[videoId, setVideoId] = useState('');

    const fetchPost = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://gerena.bg/wp-json/wp/v2/posts/${params.postID}/?_embed`
          );
          if (!response.ok) {
            throw new Error("Response issue");
          }
          const data = await response.json();
          if(data.content.rendered.includes('iframe')){
            data.content.rendered = data.content.rendered.replace(/<iframe.*?<\/iframe>/gi, '');
          }
          setPost(data);

          if(data.meta.td_last_set_video){
            const id = getYoutubeVideoId(data.meta.td_last_set_video)
            setVideoId(id)
          }

          const formattedDate = new Date(data.date).toISOString();

          const previousResponse = await fetch(
            `https://gerena.bg/wp-json/wp/v2/posts?per_page=1&before=${formattedDate}&order=desc`
          );
          const previousData = await previousResponse.json();
          const previousPost = previousData.length > 0 ? previousData[0] : null;
          setPrevious(previousPost);

          const nextResponse = await fetch(
            `https://gerena.bg/wp-json/wp/v2/posts?per_page=1&after=${formattedDate}&order=asc`
          );
          const nextData = await nextResponse.json();
          const nextPost = nextData.length > 0 ? nextData[0] : null;
          setNext(nextPost);

        } catch (error) {
          console.log(error);
        } finally { 
          setIsLoading(false);
        }
      };

      useEffect(()=>{
        fetchPost()
      },[params.postID]);


      useEffect(() => {
        const postText = contentRef.current;
        const title = document.getElementsByTagName('h1');
        if (postText) {
          const imgWrapper = postText.getElementsByTagName('figure');
          for (const wrapper of imgWrapper) {
            wrapper.removeAttribute('style');
            wrapper.removeAttribute('class');
            wrapper.style.margin = '0'
            wrapper.style.padding = '0'
          }
          for (const el of title) {
            el.removeAttribute('style');
            el.removeAttribute('class');
            el.style.margin = '0'
            el.style.padding = '0'
          }
          const imgElements = postText.getElementsByTagName('img');
            for (const img of imgElements) {
              img.removeAttribute('style');
              img.removeAttribute('class');
              img.classList.add('content-img')
            }
           
          const iframeEl = postText.getElementsByTagName('iframe');
          for (const iframe of iframeEl){
            iframe.removeAttribute('style');
            iframe.removeAttribute('class');
            iframe.style.width = '0px'
          }
        }
      }, [post]);

      
    
    return(
        isLoading ? (
            <LoaderPost/>
          ) : (
            <section>
              <article>
              <div className="post-page-wrapper">
                 <div 
                    className="single-post"
                    >
                      <BreadCrumbs
                      postTitle={post.title.rendered}
                      />
                      <div className="video">
                        <iframe 
                        width="100%" 
                        height="100%" 
                        src={
                          videoId
                          ? 
                          `https://www.youtube.com/embed/${videoId}?start=1&mute=1&autoplay=1` 
                          : 
                          `${youtubeSeries}&start=1&autoplay=1&mute=1`
                        }  
                        title="YouTube video player" 
                        frameBorder="0"  
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen></iframe>
                      </div>
                         <h1
                            dangerouslySetInnerHTML={{
                            __html:
                            post.title.rendered
                        }} 
                        ></h1>
                        <h3>Автор: <span className="post-page-author">
                          <Link onClick={scrollToTop} to={`/author/${post._embedded.author[0].id}`}>{post._embedded.author[0].name}</Link>
                          </span> <span className="post-article-date" >Дата: {postDate(post.date)}</span></h3>
                        <img src={post.jetpack_featured_media_url} alt="" />
                        <div className="share-post">
                          <InlineShareButtons
                          className='share-btn-post'
                          config={{
                            alignment: 'center',
                            color: 'social',
                            enabled: 'true',
                            language: 'en',
                            networks: [
                              'facebook',
                              'messenger',
                              'whatsapp',
                              'viber',
                            ],
                            spacing: 20,
                            radius: 10,
                            disableAnimations: true,
                          }}
                          />
                        </div>
                        <div 
                        className='post-text'
                        ref={contentRef}
                        dangerouslySetInnerHTML={{
                            __html:
                            post.content.rendered
                        }}
                        ></div>
                      <div className="post-ad">
                        <AdComponent
                        format = 'fluid'
                        layout= 'in-article'
                        className={'rectangle'}
                        />
                      </div>
                      <div className="prev-next-post">
                        {
                          previous
                          ?
                          <Link
                          to={`/${findPath(previous.categories[0])}/${previous.id}`}
                          onClick={scrollToTop}
                          >
                            <div>Предишна статия</div>
                          </Link>
                          :
                          null
                        }

                        {next 
                        ? 
                        <Link
                        to={`/${findPath(next.categories[0])}/${next.id}`}
                        onClick={scrollToTop}
                        >
                          <div>Следваща статия</div>
                        </Link>
                        : 
                        null
                        }
                      </div>




                  </div>
                    <aside className="latest-wrapper">
                      <LatestNews/>
                      <Flashscore/>
                      <div className='post-follow-btns'>
                        <p>ПОСЛЕДВАЙ НИ</p>
                        <InlineFollowButtons
                        config={{
                          action: false,
                          alignment: 'justified',
                          enabled: true,
                          spacing: 20,
                          networks: [
                            'facebook',
                            'youtube',
                            'instagram',
                          ],
                          radius: 9,
                          profiles: {
                            youtube: '@Gerenabg',
                            facebook: 'gerena.bg',
                            instagram: 'gerena.bg',
                          }                                                   
                        }}
                        />
                      </div>
                    </aside>
                 </div>
                 <div className="carousel-more">
                  {post && (<MoreFromAuthor
                        authorID = {post._embedded.author[0].id}
                        categoryInput = {post.categories[0]}
                        excludedPostId={post.id}/>)
                        }
                 </div>
              </article>
            </section>
          )
        
    )
}

export default PostPage;