import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router';
import {
    Layout,
    Row,
    Col,
    Image,
    Rate,
    Tabs,
} from 'antd';
import { BannerProduct } from '../../Components/Common/Banner/banner';
import FormReview from './Components/FormReview';
import RelatedProducts from './Components/RelatedProducts';
import Comments from './Components/Comments';
import { getProductDetail } from '../../../../redux/actions/ProductAction';

export default function ProductDetail() {
    const [visible, setVisible] = useState(false);
    const [imageProduct, setImageProduct] = useState('');
    const { TabPane } = Tabs;
    const dispatch = useDispatch()
    const math = useRouteMatch()

    const data = useSelector(state => state.products.data.data)
    
    const id = math.params.id
    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <BannerProduct>
                <h6>PRODUCTS</h6>
                <h2>Shop List</h2>
            </BannerProduct>
            <Layout className="layout" >
                {
                    data != null ? (
                        
                        <Row >
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={8}
                                xl={8}

                                className="layout_product_detail"
                            >
                                <div className="image_product_detail_gallery">
                                    <Image
                                        preview={{ visible: false }}

                                        // src={
                                            
                                           
                                        //     `https://beonlinelibrary.herokuapp.com/`
                                        // }
                                        src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/product-4.jpg"
                                        onClick={() => setVisible(true)}
                                    />
                                    <div style={{ display: 'none' }}>
                                        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                                            <Image src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/product-4.jpg" />
                                        </Image.PreviewGroup>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={16}
                                xl={16}
                                style={{ padding: '0 0 0 22px' }}
                            >
                                <div className="product_detail">
                                    <div className="title_author">
                                        <Link to="/author">{data.author}</Link>
                                    </div>
                                    <h2 className="title_product_detail">{data.nameProduct}</h2>
                                    <p className="price_product_detail">{data.price}</p>
                                    <div className="description_product_detail">
                                        <p>{data.description}</p>
                                    </div>
                                    <p className="out_of_stock">Out of stock</p>
                                    <div className="product_meta">
                                        {/* <span>SKU: $39</span> */}
                                        <p>
                                            <span>
                                                Categories:
                                                <Link to=""> Art</Link>
                                                ,
                                                <Link to=""> Best Sellers</Link>
                                                ,
                                                <Link to=""> History</Link>
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                Tags:
                                                <Link to=""> Bestseller</Link>
                                                ,
                                                <Link to=""> Fiction</Link>
                                            </span>
                                        </p>
                                    </div>

                                </div>
                                <Comments />
                            </Col>
                        </Row>

                    ) : null
                }
                <Row className="tabs_product_detail">
                    <Tabs className="description_tab" defaultActiveKey="1" centered >
                        <TabPane tab="description" key="1">
                            <div className="content_tab_description">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                                </p>
                            </div>
                        </TabPane>
                        <TabPane tab="additional infomation" key="2">
                            <div className="content_tab_infomation">
                                <p>
                                    Weight:
                                    <span>0.5 kg</span>
                                </p>
                                <p>
                                    Dimensions:
                                    <span>56 × 23 × 27 cm</span>
                                </p>
                                <p>
                                    Type:
                                    <span>Paperback, Hardcover, Audiobook, Audio CD, Kindle</span>
                                </p>
                            </div>
                        </TabPane>
                        <TabPane tab="reviews ( 1 )" key="3">
                            <div className="content_tab_reviews">
                                <p>There are no reviews yet.</p>
                                <span className="rely_title">
                                    <span>Be the first to review “Amster Hamster Trip”</span>
                                    <Rate allowClear={false} defaultValue={0} />
                                </span>
                                <FormReview />
                            </div>
                        </TabPane>
                    </Tabs>
                </Row>
                <RelatedProducts />
            </Layout>
        </div>
    )
}

