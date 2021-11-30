import React,{useState,useEffect} from 'react';

import Link from 'next/link';
import router from 'next/router';
import { getCatrgrylist } from '~/components/api/url-helper';

const HomeDefaultTopCategories = () =>{
    const [data, setData] = useState([]);
    useEffect(() => {
        getCatrgrylist()
        .then((res) => {
            setData(res.data.result);
        });
    }, []);
    console.log("HomeDefaultTopCategories",data);
    return(
    <div className="ps-top-categories">
        <div className="ps-container">
            <h3>Top categories of the month</h3>
            <div className="row">
            {data?data.map((cat,index)=>
            <div key={index} className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                    {/* <Link href={`/shop/[categoryId]`} as={`/shop/${cat.id}`}> */}
                            <a onClick={() =>router.push(`/shop/${cat.id}`)}className="ps-block__overlay"></a>
                        {/* </Link> */}
                        <img  style={{height:"178px"}} src={cat.imageURL} alt={cat.desc} />
                        <p>{cat.name}</p>
                    </div>
                </div>
                ):<p>No data found</p>}
               {/*  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/1.jpg" alt="martfury" />
                        <p>Electronics</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/2.jpg" alt="martfury" />
                        <p>Clothings</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/3.jpg" alt="martfury" />
                        <p>Computers</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/4.jpg" alt="martfury" />
                        <p>Home & Kitchen</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/5.jpg" alt="martfury" />
                        <p>Health & Beauty</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/6.jpg" alt="martfury" />
                        <p>Health & Beauty</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/7.jpg" alt="martfury" />
                        <p>Jewelry & Watch</p>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href="/shop">
                            <a className="ps-block__overlay"></a>
                        </Link>
                        <img src="/static/img/categories/8.jpg" alt="martfury" />
                        <p>Technology Toys</p>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
);} 

export default HomeDefaultTopCategories;
