import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Layout,
    Row,
    Col,
    Image,
    Rate,
    Comment,
    Divider,
    Avatar,
    List,
} from 'antd';

export default function ProductDetail() {

    const [visible, setVisible] = useState(false);
    const data = [
        {
            author: 'Michael Lord - New York Times',
            rate: 4,
            content: (
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea."
                </p>
            ),
            imageBottomComment: 'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/review-1.png',
        },
        {
            author: 'Joanne Smith - Huffington Post',
            rate: 3,
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            imageBottomComment: 'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/review-2.png',
        },
        {
            author: 'Minnie Loyd - The Guardian',
            rate: 5,
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            imageBottomComment: 'https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/review-3.png',
        },
    ];
    return (
        <div style={{ width: '100%' }}>
            <div className="banner_product_detail">
                <div className="title_banner_product">
                    <h6>PRODUCTS</h6>
                    <h2>Shop List</h2>
                </div>
            </div>
            <Layout className="layout" style={{ padding: '80px 80px', background: 'none' }}>
                <Row>
                    <Col span={8} style={{ padding: '0 22px 0 0' }}>
                        <div className="image_product_detail_gallery">
                            <Image
                                preview={{ visible: false }}

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
                    <Col span={16} style={{ padding: '0 0 0 22px' }}>
                        <div className="product_detail">
                            <div className="title_author">
                                <Link to="/author">by james hoffman</Link>
                            </div>
                            <h2 className="title_product_detail">Amster Hamster Trip</h2>
                            <p className="price_product_detail">$38.00</p>
                            <div className="description_product_detail">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit. Simul vidisse eu vim. Probo tincidunt ne vel.
                                </p>
                            </div>
                            <p className="out_of_stock">Out of stock</p>
                            <div className="product_meta">
                                <span>SKU: $39</span>
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
                        {/* <Divider /> */}
                        <Comment
                            className="comment_product_detail"
                            author={<a className="author_comment">BELGIUM</a>}
                            avatar={
                                <Avatar
                                    className="avatar_comment"
                                    src="https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/avatar-2-100x100.png"
                                    alt="Han Solo"
                                    size={{
                                        xs: 24,
                                        sm: 32,
                                        md: 40,
                                        lg: 64,
                                        xl: 80,
                                        xxl: 100,
                                    }}
                                />
                            }
                            content={
                                <div>
                                    <h3 className="author_comment_title">Jessica Johnson</h3>
                                    <p className="description_comment">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    </p>
                                </div>
                            }
                        />
                        {/* <Divider /> */}
                        <List
                            className="comment-list"
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <li className="item_comment">
                                    <Rate style={{ color: '#d14031' }} disabled defaultValue={item.rate} />
                                    <Comment
                                        className="content_item_comment"
                                        content={item.content}
                                    >
                                    </Comment>
                                    <div className="bottom_item_comment">
                                        <img src={item.imageBottomComment} alt="" />
                                        <span className="right_bottom_item_comment">{item.author}</span>
                                    </div>
                                </li>
                            )}
                        />
                    </Col>
                </Row>
            </Layout>
        </div>
    )
}

