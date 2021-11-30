import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import { getCatrgrylist } from '~/components/api/url-helper';
// import shop_data from '~/public/static/data/shopCategories';

const ShopCategories = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getCatrgrylist()
        .then((res) => {
            setData(res.data.result);
        });
    }, []);
    console.log(data);
    return (
        <div className="ps-shop-categories">
            <div className="row align-content-lg-stretch">
                {data.map((category) => (
                    <div
                        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 "
                        key={category.id}>
                        <div className="ps-block--category-2" data-mh="categories">
                            <div className="ps-block__thumbnail m-1">
                                <img style={{height:"178px"}} src={category.imageURL} alt="martfury" />
                            </div>
                            <div className="ps-block__content">
                                <h4>{category.name}</h4>
                                <ul>
                                    {category.links &&
                                        category.links.map((link) => (
                                            <li key={link}>
                                                <Link href="/shop" as={`/shop`}>
                                                    <a>{link}</a>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopCategories;
