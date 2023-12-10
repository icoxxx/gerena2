import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { arrow, home } from "../assetsExport";
import GetAuthorName from "../hooks-and-funcs/GetAuthorName";

const BreadCrumbs = ({postTitle}) => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((item) => item);
  const { postID, authorID } = useParams();

  const labels = {
    "/": "НАЧАЛО",
    "/football-club-levski": "ФУТБОЛЕН КЛУБ ЛЕВСКИ",
    "/football-club-levski/transfers": "ТРАНСФЕРИ",
    "/football-club-levski/eu": "ЕВРО ТУРНИРИ",
    "/football-club-levski/interviews": "ИНТЕРВЮТА",
    "/football-club-levski/first-team": "МЪЖКИ ОТБОР",
    "/football-club-levski/youths": "ЮНОШИ",
    "/basketball": "БАСКЕТБОЛ",
    "/volleyball": "ВОЛЕЙБОЛ",
    "/gymnastics": "ГИМНАСТИКА",
    "/others": "ДРУГИ",
  };

  if(postID){
    pathnames.pop();
  }

  if(authorID){
    pathnames.splice(0, 1)
    labels[`/${authorID}`] = GetAuthorName[authorID];
  }

  return (
    <nav className="breadcrumbs">
      <ul>
        <li>
          <span className="breadcrumb-icon" ><img src={home} alt="" /></span>
          <Link to="/">{labels["/"]}</Link>
        </li>
        {pathnames.map((_, i) => (
          <li key={i}>
            {i <= pathnames.length - 1 && (<span className="breadcrumb-icon"><img src={arrow} alt="" /></span>)} 
            <Link to={authorID ? `/author/${pathnames.slice(0, i + 1).join("/")}?page=1` : `/${pathnames.slice(0, i + 1).join("/")}`}
            dangerouslySetInnerHTML={{__html: labels[`/${pathnames.slice(0, i + 1).join("/")}`]}}
            >
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BreadCrumbs;
