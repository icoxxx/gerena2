import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { logo } from "../assetsExport";
import postDate from "../hooks-and-funcs/postDate";
import { calendar, search } from "../assetsExport";
import { useSearch } from "../hooks-and-funcs/SearchContext";


const Navigation = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHambActive, setIsHambActive] = useState(false);
  const {userSearch, setUserSearch} = useSearch();
  const navigate = useNavigate();

  const nav = [
    {
      navName: "Начало",
      path: "/",
      childs: false,
    },
    {
      navName: "Левски",
      path: "/football-club-levski",
      childs: [
        {
          childPath: "/football-club-levski/eu",
          childName: "Евротурнири",
        },
        {
          childPath: "/football-club-levski/interviews",
          childName: "Интервюта",
        },
        {
          childPath: "/football-club-levski/first-team",
          childName: "Мъжки отбор",
        },
        {
          childPath: "/football-club-levski/transfers",
          childName: "Трансфери",
        },
        {
          childPath: "/football-club-levski/youths",
          childName: "Юношески отбори",
        },
      ],
    },
    {
      navName: "Баскетбол",
      path: "/basketball",
      childs: false,
    },
    {
      navName: "Волейбол",
      path: "/volleyball",
      childs: false,
    },
    {
      navName: "Гимнастика",
      path: "/gymnastics",
      childs: false,
    },
    {
      navName: "Други",
      path: "/others",
      childs: false,
    },
  ];
  const [activeCategory, setActiveCategory] = useState(null);

  const fetchData = async (category) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://gerena.bg/wp-json/wp/v2/posts?categories=${category}&per_page=4&order=desc&`
      );
      if (!response.ok) {
        throw new Error("Response issue");
      }
      const datas = await response.json();
      setData(datas);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const levskiSubs = document.querySelectorAll("subcategory-links");

  useEffect(() => {
    switch (activeCategory) {
      case "Левски":
        levskiSubs.forEach((el) => {
          el.style.display = "block";
        });
        fetchData("216");
        break;
      case "Баскетбол":
        levskiSubs.forEach((el) => {
          el.style.display = "none";
        });
        fetchData("212");
        break;
      case "Волейбол":
        levskiSubs.forEach((el) => {
          el.style.display = "none";
        });
        fetchData("213");
        break;
      case "Гимнастика":
        levskiSubs.forEach((el) => {
          el.style.display = "none";
        });
        fetchData("217");
        break;
      case "Евротурнири":
        fetchData("211");
        break;
      case "Интервюта":
        fetchData("229");
        break;
      case "Мъжки отбор":
        fetchData("208");
        break;
      case "Трансфери":
        fetchData("210");
        break;
      case "Юношески отбори":
        fetchData("209");
        break;
      case "Други":
        fetchData("1");
        break;
    }
  }, [activeCategory]);

  const handleHamb = () => {
    const icon1 = document.getElementById("a");
    const icon2 = document.getElementById("b");
    const icon3 = document.getElementById("c");
    icon1.classList.toggle('a');
    icon2.classList.toggle('c');
    icon3.classList.toggle('b');

    const hiddenMenu = document.querySelectorAll(".hamburger-menu");
    hiddenMenu.forEach((el) => {
      el.classList.toggle("hamburger-menu-active");
    });
    const body = document.getElementsByTagName('body');
    [...body].forEach((body)=> {
      body.classList.toggle('stop-scroll');
    });
    setIsHambActive(!isHambActive)
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(()=> {
    if(isHambActive){
        window.addEventListener("resize", handleResize);
    }
    else{
        window.removeEventListener("resize", handleResize);
    }
  }, [isHambActive])

  useEffect(() => {
    if (windowWidth > 880) {
      const hiddenMenu = document.querySelectorAll(".hamburger-menu");
      hiddenMenu.forEach((el) => {
        el.classList.remove("hamburger-menu-active");
      });
        const icon1 = document.getElementById("a");
        const icon2 = document.getElementById("b");
        const icon3 = document.getElementById("c");
        icon1.classList.remove('a');
        icon2.classList.remove('c');
        icon3.classList.remove('b');
        if(isHambActive){
          setIsHambActive(false)
          const body = document.getElementsByTagName('body');
          [...body].forEach((body)=> {
            body.classList.remove('stop-scroll');
          });
        }

    }
  }, [windowWidth]);

  const handleSearch = ()=>{
    const search = document.querySelectorAll('.search-container');
    search.forEach((el)=> {
      el.classList.toggle('search-active');
    })
    const input = document.querySelectorAll('.search-input');
    input.forEach((el)=> {
      el.classList.toggle('input-active');
    })
  }

  const hiddenReturn = ()=> {
    const firstUl = document.querySelectorAll('.first-hidden');
    firstUl.forEach((el)=>{
      el.classList.toggle('toggle-first-hidden');
    })

    const secondUl = document.querySelectorAll('.second-hidden');
    secondUl.forEach((el)=>{
      el.classList.toggle('toggle-second-hidden');
    })
  };

  return (
    <>
      <div className="hamburger-menu">
        <ul className="first-hidden">
          {nav.map((element, index) => {
            return (
              element.navName !== 'Левски' 
              ?
              <Link 
              className="hidden-categories"
              onClick={handleHamb} 
              to={element.path} 
              key={`${index}-naviLi`}
              >
                  <li>{element.navName}</li>
              </Link>
              :
              <li key={`${index}-naviLi-Levski`} onClick={hiddenReturn}>{element.navName}</li>
            )
          })}
        </ul>
        <ul className="second-hidden">
            <li onClick={hiddenReturn}>Назад</li>
            {nav[1].childs.map((element, index)=> {
              return(
                <React.Fragment key={`${index}-naviLiHidden`}>
                    <Link 
                      className="hidden-categories"
                      onClick={handleHamb} 
                      to={element.childPath} 
                    >
                      <li>{element.childName}</li>
                    </Link>
                </React.Fragment>
              )
            })}
        </ul>
      </div>
      <header>
        <div className="header-container">
            <div className="hamburger-icon" id="icon" onClick={handleHamb}>
                <div className="icon-1" id="a"></div>
                <div className="icon-2" id="b"></div>
                <div className="icon-3" id="c"></div>
                <div className="clear"></div>
            </div>
          <Link to={"/"} className="logo-container">
            <img src={logo} alt="" />
          </Link>

          <div className="categories">
            {nav.map((el, index) => {
              return (
                <div
                  className="nav-item"
                  key={`${index}-${el.navName}`}
                  onMouseEnter={() => {
                    setActiveCategory(el.navName);
                    if (el.navName === "Начало") {
                      setIsVisible(false);
                    } else {
                      setIsVisible(true);
                    }
                  }}
                >
                  <Link 
                    className="nav-link" 
                    to={el.path === '/' ? el.path : `${el.path}?page=1`}
                    onClick={() => {
                      setIsVisible(false);
                    }}
                  >
                    <div className="category">{el.navName}</div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="search-wrapper" onClick={handleSearch} > <img src={search} className="search" alt="" /> </div>
        </div>
        <div className="search-container">
            <form className="search-form search-input-wrapper" onSubmit={(e)=> {
              e.preventDefault();
              const inputValue = new FormData(e.target).get("user-input");
              if(inputValue.trim() === ""){
                return;
              }
              else{
                setUserSearch(inputValue);
                navigate(`/search`);
              }
            }}>
              <input className="search-input" placeholder="Търсене" name="user-input" type="text" />
              <button type="submit" className="input-icon"> <img src={search} width='25px' alt="" /> </button>
            </form>
        </div>
        <div className="yellow"></div>
        <div className="red"></div>
        {isVisible && (
          <div className="hidden-container">
            <div
              className="hidden-content"
              onMouseLeave={() => {
                setIsVisible(false);
              }}
            >
              {(activeCategory === "Левски" ||
                activeCategory === "Евротурнири" ||
                activeCategory === "Интервюта" ||
                activeCategory === "Мъжки отбор" ||
                activeCategory === "Трансфери" ||
                activeCategory === "Юношески отбори") && (
                <div className="category-levski-container">
                  <div className="levski-subcategories">
                    {nav
                      .filter((el) => el.childs)
                      .map((obj, index) => {
                        return obj.childs.map((child, index) => (
                          <Link
                            className="subcategory-links"
                            onClick={() => {
                              setIsVisible(false);
                            }}
                            to={`${child.childPath}?page=1`}
                            key={`${child.childName}-${index}`}
                          >
                            <div
                              className="levski-subcategory"
                              onMouseEnter={() => {
                                setActiveCategory(child.childName);
                              }}
                            >
                              {child.childName}
                            </div>
                          </Link>
                        ));
                      })}
                  </div>
                  {isLoading ? (
                    <div className="loading-container">
                      <span className="loader"></span>
                    </div>
                  ) : (
                    <div className="levski-post-wrapper">
                      {data.map((post, index) => {
                        let filteredNav = '';
                        if(activeCategory === "Левски"){
                          filteredNav = nav.filter((el)=> {
                            return el.navName === activeCategory;
                          });
                        }
                        else{
                          filteredNav = nav[1].childs.filter((el)=>{
                            return el.childName === activeCategory;
                          })
                        }
                        return  (
                          <Link
                            className={index < 3 ? "levski-post-link" : "levski-post-link isLast"}
                            onClick={() => {
                              setIsVisible(false);
                            }}
                            key={`${index}-post`}
                            to={
                              activeCategory === "Левски"
                              ?
                              `${filteredNav[0].path}/${post.id}`
                              :
                              `${filteredNav[0].childPath}/${post.id}`
                            }
                          >
                            <div className="levski-post">
                              <div className="levski-post-pic">
                                <img
                                  src={post.jetpack_featured_media_url}
                                  alt=""
                                />
                                <div className="post-time">
                                  <span> <img src={calendar} width='15px' alt="" /> </span> {postDate(post.date)}
                                </div>
                              </div>
                              <div className="levski-post-txt"
                                dangerouslySetInnerHTML={{
                                __html:
                                post.title.rendered.length >= 65
                                ? `${post.title.rendered.slice(0, 60)}...`
                                : post.title.rendered,
                                }}
                              >
                              </div>
                            </div>
                          </Link>
                         )
                      })}
                    </div>
                  )}
                </div>
              )}
              {(activeCategory === "Баскетбол" ||
                activeCategory === "Волейбол" ||
                activeCategory === "Гимнастика" ||
                activeCategory === "Други") &&
                (isLoading ? (
                  <div className="loading-container reposition">
                    <span className="loader"></span>
                  </div>
                ) : (
                  <div className="basketball-post-wrapper">
                    {data.map((post, index) => {
                        const filteredNav = nav.filter((el)=> {
                          return el.navName === activeCategory;
                        });
                      return (
                        <Link
                          className={index < 3 ? 'other-post-link' : 'other-post-link isLast'}
                          onClick={() => {
                            setIsVisible(false);
                          }}
                          key={`${index}-post`}
                          to={`${filteredNav[0].path}/${post.id}`}
                        >
                          <div className="other-post">
                            <div className="other-post-pic">
                              <img
                                src={post.jetpack_featured_media_url}
                                alt=""
                              />
                              <div className="post-time">
                              <span> <img src={calendar} width='15px' alt="" /> </span> {postDate(post.date)}
                              </div>
                            </div>
                            <div
                              className="other-post-txt"
                              dangerouslySetInnerHTML={{
                                __html:
                                  post.title.rendered.length >= 65
                                    ? `${post.title.rendered.slice(0, 60)}...`
                                    : post.title.rendered,
                              }}
                            ></div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;
