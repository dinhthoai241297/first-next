import Link from 'next/link';
import Layout from './../comps/MyLayout';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';

const Test = () => (
    <Link href="/about"><a>About</a></Link>
);

const Index = (props) => (
    <Layout  >
        <div className="markdown" >
            <Markdown source={``} />
        </div>
        {/* <style jsx global>{`
            .markdown ul li a:hover {
                color: orange
            }
        `}</style> */}
        <style jsx global>{`
            ul {
                list-style: none
            }
            ul li {
                margin-bottom: 5px;
            }
            ul li a {
                text-decoration: none;
                transition: all .3s;
                color: #444;
            }
            ul li a:hover {
                color: orange
            }

            .markdown {
                color: red;
            }
        `}</style>
        <h1>Batman TV Shows</h1>
        <Test />
        <ul>
            {props.shows.map(({ show }) => (
                <li key={show.id}>
                    <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </Layout>
)

Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data
    };
}

export default Index;
