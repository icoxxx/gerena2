import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import findPath from "../hooks-and-funcs/FindPath";
import LoaderPost from "./LoaderPost";
import LatestNews from "./LatestNews";
import Flashscore from "./Flashscore";
import { InlineFollowButtons } from "sharethis-reactjs";
import scrollToTop from "../hooks-and-funcs/ScrollToTop";
import BreadCrumbs from "./BreadCrumbs";
import postDate from "../hooks-and-funcs/postDate";
import { calendar, leftArrowMain, rightArrowMain } from "../assetsExport";

const MainContent = ({category, authorID})=> {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=> {
      const page = searchParams.get('page')
      if(!page){
        const params = {page: 1}
        setSearchParams(params)
      }
    },[])
  
    const fetchPosts = async (page) => {
        setIsLoading(true)
      try {
        let response;
        if(!authorID){
          response = await fetch(`https://gerena.bg/wp-json/wp/v2/posts?categories=${category}&orderby=date&page=${page}`);
        }
        else{
          response = await fetch(`https://gerena.bg/wp-json/wp/v2/posts?author=${authorID}&orderby=date&page=${page}`)
        }
        const data = await response.json();
        if(Array.isArray(data)){
          const updatedData = data.map(post => {
            let modifiedContent = post.content.rendered;
            if (modifiedContent.includes('iframe')) {
              modifiedContent = modifiedContent.replace(/<iframe.*?<\/iframe>/gi, '');
            }
        
            if (modifiedContent.includes('span')) {
              modifiedContent = modifiedContent.replace(/<p>(.*?)<span.*?>(.*?)<\/span>(.*?)<\/p>/gi, (match, pStart, spanContent, pEnd) => {
                return `<p>${pStart}${spanContent}${pEnd}</p>`;
              });
              modifiedContent = modifiedContent.replace(/<span.*?<\/span>/gi, '');
            }
            return {
              ...post,
              content: {
                ...post.content,
                rendered: modifiedContent
              }
            };
          });
          setPosts(updatedData);
          const totalPagesHeader = response.headers.get('X-WP-TotalPages');
          setTotalPages(parseInt(totalPagesHeader, 10));
        }
      } catch (error) {
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
    };

    useEffect(()=> {
      const page = searchParams.get('page')

      setCurrentPage(Number(page))
      if(page){
        fetchPosts(page)
      }
    },[searchParams])
  
    const handleNextPage = () => {
        const page = Number(searchParams.get('page'));
      setIsPrevDisabled(false)
      if(authorID){
        navigate(`/author/${authorID}?page=${page + 1}`)
      }
      else{
        navigate(`/${findPath(category)}?page=${page + 1}`)
      }  
      setCurrentPage(page)
    };
  
    const handlePrevPage = () => {
      const page = Number(searchParams.get('page'));
      if (page > 1) {
        if(authorID){
          navigate(`/author/${authorID}?page=${page - 1}`)
        }
        else{
          navigate(`/${findPath(category)}?page=${page - 1}`)
        }
        setCurrentPage(page)
      }
    };
    
    const renderPageNumbers = () => {
        const pagesToShow = 3;
        const sidePages = 1;
        const pagesArray = [];
    
        if (totalPages <= pagesToShow + sidePages * 2) {
          for (let i = 1; i <= totalPages; i++) {
            pagesArray.push(i);
          }
        } else if (currentPage <= pagesToShow) {
          for (let i = 1; i <= pagesToShow + sidePages; i++) {
            pagesArray.push(i);
          }
          pagesArray.push('...');
          pagesArray.push(totalPages - 1);
          pagesArray.push(totalPages);
        } else if (currentPage > totalPages - pagesToShow) {
          pagesArray.push(1);
          pagesArray.push(2);
          pagesArray.push('...');
          for (let i = totalPages - (pagesToShow + sidePages * 2); i <= totalPages; i++) {
            pagesArray.push(i);
          }
        } else {
          pagesArray.push(1);
          pagesArray.push('...');
          for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
            pagesArray.push(i);
          }
          pagesArray.push('...');
          pagesArray.push(totalPages);
        }

        const handlePageClick = (page) => {
            setCurrentPage(page);
            if(authorID){
              navigate(`/author/${authorID}?page=${page}`)
            }
            else{
              navigate(`/${findPath(category)}?page=${page}`)
            }
          };
    
        return pagesArray.map((page, index) => {
            if (page === '...') {
              return (
                <span className="dots-numb" key={index}>{page}</span>
              );
            } else {
              return (
                <span
                  key={index}
                  className={currentPage === page ? 'active-page page-numb' : 'page-numb'}
                  onClick={() => {
                    handlePageClick(page)
                    scrollToTop()
                }}
                >
                  {page}
                </span>
              );
            }
          });
        };
        useEffect(()=> {
            if(currentPage <= 1){
                setIsPrevDisabled(true);
              }
            else if(currentPage > 1){
                setIsPrevDisabled(false)
            }
            if(totalPages){
                if(currentPage >= totalPages){
                    setIsNextDisabled(true)
                }
                if(isNextDisabled && currentPage < totalPages){
                    setIsNextDisabled(false)
                }
              }
        },[currentPage, totalPages])
  
    return (
        isLoading ? (
            <LoaderPost></LoaderPost>
        ) :
        posts.length > 0 && (
            <div className="main-content-wrapper">
                <BreadCrumbs></BreadCrumbs>
                <div className="flex-main-container">
                        <div className="main-posts single-post">
                                {posts.map((post, i)=> {
                                    return(
                                        i === 0
                                        ?
                                        <Link
                                        className="main-content-link"
                                        onClick={scrollToTop}
                                        key={`${i}-main-content`} 
                                        to={`/${findPath(post.categories[0])}/${post.id}`}>
                                            <div className="main-content-first-post-wrapper">
                                                <div className="main-content-first-post">
                                                    <img src={post.jetpack_featured_media_url} ></img>
                                                    <div className="post-time-main-content">
                                                        <span> <img src={calendar} alt="" /> </span> {postDate(post.date)}
                                                    </div>
                                                </div>
                                                <h1
                                                className="main-content-title"
                                                dangerouslySetInnerHTML={{__html:
                                                    post.title.rendered
                                                }}
                                                >
                                                </h1>
                                            </div>
                                        </Link>
                                        :
                                        <Link
                                        onClick={scrollToTop}
                                        key={`${i}-main-content`}
                                        to={`/${findPath(post.categories[0])}/${post.id}`}
                                        className="main-content-secondary-link"
                                        >
                                            <div className={i % 2 === 0 ? 'main-secondary-post secondary-gray' : 'main-secondary-post'}>
                                                <div className="secondary-img-wrapper">
                                                    <img src={post.jetpack_featured_media_url} alt="" />
                                                    <div className="post-time-main-content">
                                                        <img src={calendar} alt="" /> <span>{postDate(post.date)}</span>
                                                    </div>
                                                </div>
                                                <div className="secondary-info">
                                                    <h4
                                                    dangerouslySetInnerHTML={{__html:
                                                    post.title.rendered
                                                     }}
                                                    >
                                                    </h4>
                                                    <div
                                                    className="main-page-post-content" 
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                        `${post.content.rendered.slice(0, 50)}...`
                                                    }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                                <div className="flex-pagination">

                                    <button
                                    disabled={isPrevDisabled} 
                                    className="prev-page-button"
                                    onClick={()=>{
                                        handlePrevPage();
                                        scrollToTop();
                                    }}>
                                        <img 
                                        className="main-arrows" src={leftArrowMain} alt="" />
                                    </button>

                                    <div className="pagination-numbers">
                                        {renderPageNumbers()}
                                    </div>

                                    <button
                                    disabled={isNextDisabled}
                                    className="next-page-button" 
                                    onClick={()=> {
                                        handleNextPage();
                                        scrollToTop();
                                    }}>
                                        <img className="main-arrows" src={rightArrowMain} alt="" />
                                    </button>

                                 </div>
                        </div>
                        <aside className="main-sticky-wrapper">
                            <div className="video-main">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?si=so4FVKgg8VUv3xc4&amp;list=PLMxONK1QhCuZIU86bgmfZUghOF6qBKnT7&start=1&autoplay=1&mute=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                            <Flashscore></Flashscore>
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
          </div>
        )
    );
  };

export default MainContent;