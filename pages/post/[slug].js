
export default function Post({post}) {
  return (
    <div className="post-content">
        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
    </div>
  )
}


export async function getServerSideProps({ params }) {
  const slug = params.slug
  const posts = await fetch(`https://www.expandtheroom.com/wp-json/wp/v2/posts?slug=${slug}`).then(res => res.json());
  return {
    props: {
      post: posts[0]
    }
  }
}

export async function getStaticPaths() {
  const posts = await fetch('https://www.expandtheroom.com/wp-json/wp/v2/posts').then(res => res.json());
  const paths = posts.map(post => {
    const slug = post.slug
    return {
      params: {
        slug
      }
    }
  });
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}


