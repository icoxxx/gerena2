import React, { useState } from "react";
import { useEffect } from "react";
import { calendar } from "../assetsExport";
import postDate from "../hooks-and-funcs/postDate";
import { Link } from "react-router-dom";
import findPath from "../hooks-and-funcs/FindPath";
import scrollToTop from "../hooks-and-funcs/ScrollToTop";
import Carousel from "react-multi-carousel";
import findCategory from "../hooks-and-funcs/FindCategory";

const FrontNews = ({items})=> {
    const [filtered, setFiltered] = useState([]);

    useEffect(()=> {
        setFiltered(()=> {
            return items.slice(3)
          });
    },[items])

    return(
        <>
        {items && items.length > 0 && filtered.length > 0 && (
          <>
          <div className="home-category-title">
              <h2 className="home-category-title" >{findCategory(items[0].categories[0])}</h2>
          </div>
            <div className="front-news-container">
                    <Link
                    to={`/${findPath(items[0].categories[0])}/${items[0].id}`}
                    className="front-news-wrapper-big"
                    onClick={scrollToTop}
                    >
                                    <img src={items[0].jetpack_featured_media_url} alt="" />
                                    <div className="front-news-text-container">
                                        <div className="front-news-text-big"
                                        dangerouslySetInnerHTML={{__html:
                                            items[0].title.rendered
                                        }}
                                        >
                                            
                                        </div>
                                        <div className="article-info"><span> <img src={calendar} width='12px' alt="" /> </span> {postDate(items[0].date)} <span className="article-category">{findCategory(items[0].categories[0])}</span></div>
                                    </div>
                    </Link>
                    <div className="front-news-wrapper-small">
                        <Link
                        to={`/${findPath(items[1].categories[0])}/${items[1].id}`}
                        className="front-first-small"
                        onClick={scrollToTop}
                        >
                                    <img src={items[1].jetpack_featured_media_url} alt="" />
                                    <div className="front-news-text-container">
                                        <div className="front-news-text-small"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                            items[1].title.rendered.length >= 50
                                            ? `${items[1].title.rendered.slice(0, 49)}...`
                                            : items[1].title.rendered,
                                        }}
                                        >
                                        </div>
                                        <div className="article-info"><span> <img src={calendar} width='12px' alt="" /> </span> {postDate(items[1].date)} <span className="article-category">{findCategory(items[1].categories[0])}</span></div>
                                    </div>
                        </Link>
                        <Link
                        to={`${findPath(items[2].categories[0])}/${items[2].id}`}
                        className="front-second-small"
                        onClick={scrollToTop}
                        >
                                    <img src={items[2].jetpack_featured_media_url} alt="" />
                                    <div className="front-news-text-container">
                                        <div className="front-news-text-small"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                            items[2].title.rendered.length >= 50
                                            ? `${items[2].title.rendered.slice(0, 49)}...`
                                            : items[2].title.rendered,
                                        }}
                                        >
                                        </div>
                                        <div className="article-info"><span> <img src={calendar} width='12px' alt="" /> </span> {postDate(items[2].date)} <span className="article-category">{findCategory(items[2].categories[0])}</span></div>
                                    </div>
                        </Link>
                    </div>
            </div>
            <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="my-carousel-wrapper"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    partialVisible
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                      desktop: {
                        breakpoint: {
                          max: 3000,
                          min: 1024,
                        },
                        items: 3,
                        partialVisibilityGutter: 40
                      },
                      mobile: {
                        breakpoint: {
                          max: 420,
                          min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 100,
                      },
                      tablet: {
                        breakpoint: {
                          max: 1024,
                          min: 420,
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                      }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    {filtered.map((post,index)=> {
                        return(
                            <Link 
                            className="front-more-posts-container" 
                            key={`${index}=more-posts`}
                            to={`/${findPath(post.categories[0])}/${post.id}`}
                            onClick={scrollToTop}
                            >
                                <div className="front-more-posts-img-wrapper">
                                <img src={post.jetpack_featured_media_url} alt="" />
                                <div><span className="more-posts-calendar"> <img src={calendar} alt="" /> </span>{postDate(post.date)} <span className="article-category">{findCategory(post.categories[0])}</span></div>
                                </div>
                                <div
                                className="slider-txt"
                                dangerouslySetInnerHTML={{
                                    __html:
                                    post.title.rendered.length >= 46
                                        ? `${post.title.rendered.slice(0, 45)}...`
                                        : post.title.rendered,
                                }}
                                ></div>
                            </Link>
                        )
                    })}
              </Carousel>
              <Link 
              className="home-link"
              to={`/${findPath(items[0].categories[0])}`}
              >
                <div className="front-all-levski">ВИЖ ВСИЧКИ</div> 
              </Link>
            </>
          )}
        </>
    )
};

export default FrontNews;