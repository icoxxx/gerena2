import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import findPath from "../hooks-and-funcs/FindPath";
import scrollToTop from "../hooks-and-funcs/ScrollToTop";

const MoreFromAuthor = ({ authorID, categoryInput, excludedPostId }) => {
  const [moreFromAuthor, setMoreFromAuthor] = useState([]);
  const [moreFromCategory, setMoreFromCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [morePosts, setMorePosts] = useState('related');

  const fetchMore = async () => {
    setIsLoading(true)
    try {
      const authorIDValue = authorID;
      const category = categoryInput;

      const responseAuthor = await fetch(
        `https://gerena.bg/wp-json/wp/v2/posts?author=${authorIDValue}&per_page=12&order=desc`
      );
      const authorData = await responseAuthor.json();
      setMoreFromAuthor(()=> {
        return authorData.filter((post)=> post.id !== excludedPostId)
      });

      const responseCategory = await fetch(
        `https://gerena.bg/wp-json/wp/v2/posts?categories=${category}&per_page=12&order=desc`
      );
      const categoryData = await responseCategory.json();
      setMoreFromCategory(()=> {
        return categoryData.filter((post)=> post.id !== excludedPostId)
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
        setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchMore();
  }, [authorID, categoryInput, excludedPostId]);

  const handleMore = (e)=> {
    const spans = document.querySelectorAll('.handle-more');
    spans.forEach((el)=> {
        el.classList.remove('blue-span');
    })
    e.target.classList.add('blue-span');
  };

  const renderCarouselItems = (posts) => {
    return posts.map((post, index) => (
      <Link 
      className="more-posts-container" 
      key={`${index}=more-author`}
      to={`/${findPath(post.categories[0])}/${post.id}`}
      onClick={scrollToTop}
      >
        <div className="more-posts-img-wrapper">
          <img src={post.jetpack_featured_media_url} alt="" />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              post.title.rendered.length >= 46
                ? `${post.title.rendered.slice(0, 45)}...`
                : post.title.rendered,
          }}
        ></div>
      </Link>
    ));
  };

  return (
    <>
    <div className="more-author-category"> 
            <span 
            className="blue-span handle-more"
            onClick={(e)=> {
                handleMore(e);
                setMorePosts('related');
            }} 
            >СВЪРЗАНИ СТАТИИ
            </span> 
            <span 
            className="handle-more"
            onClick={(e)=> {
                handleMore(e);
                setMorePosts('author');
            }}
            >ОЩЕ ОТ АВТОРА</span>
    </div>
    {!isLoading && (
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
          removeArrowOnDeviceType={'mobile'}
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
                max: 490,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 100,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 490,
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
          {morePosts === 'related' && renderCarouselItems(moreFromCategory)}
          {morePosts === 'author' && renderCarouselItems(moreFromAuthor)}
        </Carousel>
    )}
    </>
  );
};

export default MoreFromAuthor;
