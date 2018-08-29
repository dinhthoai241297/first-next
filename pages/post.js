// import { withRouter } from 'next/router';
import Layout from './../comps/MyLayout';
import fetch from 'isomorphic-unfetch';

// export default withRouter((props) => (
//     <Layout>
//         <h1>{props.router.query.title}</h1>
//         <p>This is a blog post content.</p>
//     </Layout>
// ));

// const Content = (props) => (
//     <Layout>
//         <h1>{props.test.router.query.title}</h1>
//         <p>This is a blog post content.</p>
//     </Layout>
// );

// const Post = withRouter((props) => {
//     return (
//         <Content test={props} />
//     );
// });

// export default Post;


const Post = (props) => (
    <Layout>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image.medium} />
    </Layout>
)

Post.getInitialProps = async function (context, props) {
    const { id } = context.query;
    console.log(context);
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    console.log(`Fetched show: ${show.name}`);

    return { show };
}

export default Post;
