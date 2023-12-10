import React, { useEffect, useState } from "react";
import UseApi from "../hooks-and-funcs/UseApi";
import { Link } from "react-router-dom";
import postDate from "../hooks-and-funcs/postDate";
import scrollToTop from "../hooks-and-funcs/ScrollToTop";

const LatestNews = ()=> {
    const {data: items, fetchData} = UseApi([]);
    const [categoriesId, setCategoriesId] = useState([]);

    useEffect(()=> {
        fetchData('https://gerena.bg/wp-json/wp/v2/posts?orderby=date&per_page=4&order=desc')
    },[])

    useEffect(()=>{
        if(items.length > 0){
            items.map((item, index)=> {
                setCategoriesId((prev)=> {
                    return(

                        [...prev, item.categories[0]]
                    )
                })
            })
        }

    },[items])
    const findCategory = (id)=> {
        let categoryPath = ''
        switch (id) {
            case 1: 
            categoryPath = 'others';
                break;
            case 212: 
            categoryPath = 'basketball';   
                break;
            case 213:
            categoryPath = 'volleyball';
                break;
            case 217:
            categoryPath = 'gymnastics';
                break;
            case 211:
            categoryPath = 'football-club-levski/eu';
                break;
            case 229:
            categoryPath = 'football-club-levski/interviews';
                break;
            case 216:
            categoryPath = 'football-club-levski';
                break;
            case 210:
            categoryPath = 'football-club-levski/transfers';
                break;
            case 209:
            categoryPath = 'football-club-levski/youths';
                break;
            case 208:
            categoryPath = 'football-club-levski/first-team';
                break;
        }
        return categoryPath;
    }
    return(
        <>
        <div className="latest-container">
            <div className="aside-title">
                ПОСЛЕДНИ НОВИНИ
            </div>

            <div className="latest-column">
                {items.map((post, index)=> {
                    return(
                        <Link
                        onClick={scrollToTop}
                        className="latest-content"
                        to={`/${findCategory(categoriesId[index])}/${post.id}`}
                        key={`${index}-latestNews`}
                        >
                                        <div className="latest-img-wrapper">
                                         <img src={post.jetpack_featured_media_url} alt="" />
                                        </div>
                                        <div className="latest-title">
                                            <div
                                              dangerouslySetInnerHTML={{
                                              __html:
                                              post.title.rendered.length >= 50
                                              ? `${post.title.rendered.slice(0, 45)}...`
                                              : post.title.rendered,}}
                                            ></div> 
                                            <div>{postDate(post.date)}</div>
                                        </div>
                        </Link>
                    )
                })}
            </div>

        </div>
        </>
    )
};

export default LatestNews;