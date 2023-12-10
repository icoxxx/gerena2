import React from "react";
import Carousel from "react-multi-carousel";
import postDate from "../hooks-and-funcs/postDate";
import findCategory from "../hooks-and-funcs/FindCategory";
import findPath from "../hooks-and-funcs/FindPath";
import { Link } from "react-router-dom";
import scrollToTop from "../hooks-and-funcs/ScrollToTop";
import { calendar } from "../assetsExport";

const FrontNewsSlider = ({data, title, classNames})=> {
    return(
        <section className={classNames.sectionContainer}>
            <div className={classNames.container}>
                <div className="home-other-news-flex">
                        <div className="home-category-title">
                            <h2 className="home-category-title" >{title}</h2>
                        </div>
                        
                        <Link 
                        className="home-other-news-link"
                        to={`/author/${data[0].author}`}
                        >
                                <div onClick={scrollToTop} className="front-all-levski">ВИЖ ВСИЧКИ</div> 
                        </Link>
                </div>
                <div className={classNames.carouselWrapper}>
                    <Carousel
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    arrows
                    centerMode={false}
                    className=""
                    containerClass={classNames.carouselContainer}
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
                        {data.map((post, index)=> {
                        return(
                            <Link
                            className="front-more-posts-container" 
                            key={`${index}-${title}`}
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
                        ) })}
                    </Carousel>
                </div>
            </div>
        </section>
    )
};

export default FrontNewsSlider;