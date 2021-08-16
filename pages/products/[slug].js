import { fromImageToUrl, API_URL } from "../../utils/urls";
import Head from "next/head";
import { twoDecimals } from "../../utils/format";

const Product = ({ product }) => {
  console.log("received prod", product);
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} />
      <h3>{product.name}</h3>
      <p>${twoDecimals(product.price)}</p>
      <p>{product.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0], //because the api response of the filters is array
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all possible paths
  const product_res = await fetch(`${API_URL}/products`);
  const products = await product_res.json();
  //Retrun them to next.js context
  const data = {
    paths: products.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false, //Tells to nextjs to show 404 if the param not matched
  };
  return data;
}

export default Product;
