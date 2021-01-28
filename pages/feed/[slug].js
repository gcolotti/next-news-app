import styles from '../../styles/Feed.module.css';

const Feed = ({ pageNumber, articles }) => {

    return (
        <div className={styles.main}>
            {articles.map((article, index) => (
                <div key={index} className={styles.post}>
                    <h1 onClick={() => window.open(article.url, '_blank')}>{article.title}</h1>
                    <p>{article.description}</p>
                    {!!article.urlToImage && <img src={article.urlToImage} />}
                </div>
            ))}
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