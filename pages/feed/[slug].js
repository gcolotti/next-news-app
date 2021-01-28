import styles from '../../styles/Feed.module.css';
import Toolbar from '../../components/toolbar';
import { useRouter } from 'next/router';

const Feed = ({ pageNumber, articles }) => {

    const router = useRouter();

    const handlePreviuosPageClick = () => {
        if (pageNumber > 1) {
            router.push(`/feed/${pageNumber - 1}`)
        }
    };

    const handleNextPageClick = () => {
        if (pageNumber < 5) {
            router.push(`/feed/${pageNumber + 1}`)
        }
    };

    return (
        <div className="page-container">

            <Toolbar />

            <div className={styles.main}>
                {articles.map((article, index) => (
                    <div key={index} className={styles.post}>
                        <h1 onClick={() => window.open(article.url, '_blank')}>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} />}
                    </div>
                ))}
            </div>

            <div className={styles.paginator}>
                <div onClick={handlePreviuosPageClick} className={pageNumber === 1 ? styles.disabled : styles.active}>
                    « Prev
                </div>
                <div>#{pageNumber}</div>
                <div onClick={handleNextPageClick} className={pageNumber === 5 ? styles.disabled : styles.active}>
                    Next »
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.slug;
    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            }
        }
    }
    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=ar&pageSize=5&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            },
        },
    );
    const { articles } = await apiResponse.json();

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber),
        }
    }
};

export default Feed;