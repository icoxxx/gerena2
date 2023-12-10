import React, { useEffect, useState } from "react";
import { useSearch } from "../hooks-and-funcs/SearchContext";
import LoaderPost from "../components/LoaderPost";
import { Link, useSearchParams } from "react-router-dom";
import findPath from "../hooks-and-funcs/FindPath";

const SearchPage = () => {
    const { userSearch } = useSearch();
    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showedPosts, setShowedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(()=> {
      const page = searchParams.get('page')
      if(!page){
        if(userSearch){
            const params = {search: userSearch}
            setSearchParams(params)
        }
      }
    },[])

    useEffect(()=>{
        if(userSearch){
            const params = {search: userSearch}
            setSearchParams(params)
        }
    }, [userSearch])


    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const searchWord = searchParams.get('search')
            const response = await fetch(
                `https://gerena.bg/wp-json/wp/v2/posts?search=${searchWord}&orderby=date&per_page=100`
            );
            const data = await response.json();
            const filteredPosts = data.filter(post =>
                post.title.rendered.toLowerCase().includes(searchWord.toLowerCase())
              );
            setAllPosts(filteredPosts);
            if(filteredPosts.length > 5){
              setShowedPosts(filteredPosts.slice(0, postsPerPage));
            }
            else{
              setShowedPosts(filteredPosts)
            }

        } catch (error) {
            console.error(`Error fetching posts: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
            fetchPosts();
    }, [searchParams]);

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const endIndex = nextPage * postsPerPage;
        setShowedPosts(allPosts.slice(0, endIndex));
        setCurrentPage(nextPage);
    };

    return (
        <>
            {isLoading ? (
                <LoaderPost />
            ) : (
                <>
                <div className="search-page-container">
                    <div className="search-page-wrapper">
                        <h2>РЗУЛТАТИ ОТ ПОСЛЕДНИТЕ 100 СТАТИИ</h2>
                        <section className="search-page-flex-container">
                            {showedPosts.map((post) => (
                                    <article key={`${post.id}-search`}
                                    className="search-result-post"
                                    >
                                        <Link
                                        to={`/${findPath(post.categories[0])}/${post.id}`}
                                        >
                                            <div className="search-result-img-wrapper">
                                                <img src={post.jetpack_featured_media_url} alt="" />
                                            </div>
                                            <h4 className="search-result-title"
                                            dangerouslySetInnerHTML={{__html:
                                                post.title.rendered
                                            }}
                                            ></h4>
                                        </Link>
                                    </article>
                                ))}
                        </section>
                        {showedPosts.length > 0 && (
                            <div className="load-more-wrapper">
                                    <button className="load-more-btn" onClick={handleLoadMore} disabled={showedPosts.length >= allPosts.length}>
                                        {showedPosts.length >= allPosts.length ? "КРАЙ" : "ЗАРЕДИ ОЩЕ"}
                                    </button>
                            </div>
                        )}
                    </div>
                </div>
                </>
            )}

        </>
    );
};

export default SearchPage;


