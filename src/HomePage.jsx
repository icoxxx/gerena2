import React, { useEffect, useState } from "react";
import FrontNews from "./components/FrontNews";
import AdComponent from './components/AdComponent';
import LoaderPost from "./components/LoaderPost";
import FrontNewsSlider from "./components/FrontNewsSlider";

const HomePage = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])
    const fetchAll = async ()=> {
        setIsLoading(true)
        try {
            const urls = [
                'https://gerena.bg/wp-json/wp/v2/posts?categories=216&per_page=20&orderby=date',
                'https://gerena.bg/wp-json/wp/v2/posts?categories=212&per_page=20&orderby=date',
                'https://gerena.bg/wp-json/wp/v2/posts?categories=213&per_page=20&orderby=date',
                'https://gerena.bg/wp-json/wp/v2/posts?categories=217&per_page=20&orderby=date',
                'https://gerena.bg/wp-json/wp/v2/posts?categories=1&per_page=20&orderby=date',
                'https://gerena.bg/wp-json/wp/v2/posts?author=12&per_page=20&orderby=date',
                'https://gerena.bg/wp-json/wp/v2/posts?author=16&per_page=20&orderby=date',
            ];

            const responses = await Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all(responses.map(res => res.json()));
            setData(data);


        } catch (error) {
            console.error('Error fetching data:', error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=> {
        fetchAll();
    },[])

    return (
        <>
        {
        isLoading 
        ? 
        (<LoaderPost></LoaderPost>)
        :
        (
          <main className="home-container"> 
                  <div className="home-wrapper">
                      <section>
                      <FrontNews
                      items = {data[0]}
                      />
                      </section>
  
                       <section>
                          <FrontNews
                          items={data[1]}
                          />
                       </section>
  
  
                      <section className="volley-section">
                          <FrontNews
                          items={data[2]}
                          />
                       </section>

                       <section className="home-ad">
                        <AdComponent
                            format = {'fluid'}
                            layout= {'in-article'}
                            className= {'front-ad'} 
                        />
                       </section>

                       <div className="home-page-flex-sliders">
                        <FrontNewsSlider
                        data = {data[5]}
                        title={'ТЕМА СПОРТ'}
                        classNames = {{
                            container: 'tema-sport-container',
                            carouselWrapper: 'tema-sport-wrapper',
                            carouselContainer: 'my-carousel-wrapper',
                            sectionContainer: 'tema-sport-section',
                        }}
                        >
                        </FrontNewsSlider>

                        <FrontNewsSlider
                        data = {data[6]}
                        title={'МАЧ ТЕЛЕГРАФ'}
                        classNames = {{
                            container: 'match-telegraph-container',
                            carouselWrapper: 'match-telegraph-wrapper',
                            carouselContainer: 'my-carousel-wrapper-telegraph',
                            sectionContainer: 'telegraph-section',
                        }}
                        >
                        </FrontNewsSlider>
                       </div>

                      <section className="home-ad">
                        <AdComponent
                            format = {'fluid'}
                            layout= {'in-article'}
                            className= {'front-ad'} 
                        />
                      </section>
  
                      <section className="gym-section">
                          <FrontNews
                          items={data[3]}
                          />
                       </section>
  
  
                      <section>
                          <FrontNews
                          items={data[4]}
                          />
                       </section>
                  </div>
          </main>
       )}
        </>
      )}

export default HomePage;