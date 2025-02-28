
import { Empty, Input, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import orderApi from '../../../../api/orderApi'
import userApi from "../../../../api/userApi"
import couponApi from "../../../../api/couponApi"
import { BannerProduct } from '../../Components/Common/Banner/banner'
import { ResetCart } from "../Cart/cartSlide"
import ItemCart from './Components/ItemCart'
import { cartItemTotalSelector } from './selector'


const { Option } = Select;

const Cart = () => {
    const [GetTinh, setGetTinh] = useState()
    const [GetQuan, setGetQuan] = useState()
    const [GetXa, setGetXa] = useState()
    const [ValueQuan, setValueQuan] = useState()
    const [ValueXa, setValueXa] = useState()
    const [PriceShip, setPriceShip] = useState(0)
    const [nameTinh, setnameTinh] = useState()
    const [nameQuan, setnameQuan] = useState()
    const [nameHuyen, setnameHuyen] = useState()
    const [IdUser, setIdUser] = useState()
    const [ValueCoupon, setValueCoupon] = useState()
    const [IdCode, setIdCode] = useState()
    const [PriceCoupon, setPriceCoupon] = useState(0)

    const [ValueName, setValueName] = useState()
    const [ValuePhone, setValuePhone] = useState()
    const [ValueEmail, setValueEmail] = useState()

    const history = useHistory();
    const dispatch = useDispatch();


    useEffect(() => {
        fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            method: 'GET', // or 'PUT'
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": "35fd8432-5c92-11ec-bde8-6690e1946f41"
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGetTinh(data.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        const fetchAccessToken = async () => {
            try {
                const adminToken = await localStorage.getItem("token");
                const data = {
                    token: adminToken,
                };
                const res = await userApi.AccessToken(data);
                const User = JSON.parse(localStorage.getItem("user-info"));
                setIdUser(User.data[0]._id)
                setValueName(User.data[0].fullName)
                setValueEmail(User.data[0].email)
            } catch (err) {
                console.log(err);
            }
        };

        fetchAccessToken()
    }, [])

    useEffect(() => {
        const fetchGetPriceShip = async (serviceId) => {
            const data = {
                from_district_id: 1454,
                service_id: serviceId,
                to_district_id: ValueQuan,
                to_ward_code: ValueXa,
                height: 50,
                length: 20,
                weight: 200,
                width: 20,
                insurance_value: 1000000
            }

            console.log(data);
            if (ValueXa) {
                fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "token": "35fd8432-5c92-11ec-bde8-6690e1946f41"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        setPriceShip(data.data.total)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        }

        const dataSevice = {
            shop_id: 2334706,
            from_district: 1454,
            to_district: ValueQuan
        }

        fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services', {
            method: 'POST', // or 'PUT'
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": "35fd8432-5c92-11ec-bde8-6690e1946f41"
            },
            body: JSON.stringify(dataSevice)
        })
            .then(response => response.json())
            .then(data => {
                fetchGetPriceShip(data.data[0].service_id);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }, [ValueXa])

    const handleGetQuan = (values) => {
        const data = {
            province_id: Number(values)
        }
        const name = GetTinh.filter(item => item.ProvinceID == values);
        console.log(name);
        setnameTinh(name[0].ProvinceName)
        fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
            method: 'POST', // or 'PUT'
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": "35fd8432-5c92-11ec-bde8-6690e1946f41"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGetQuan(data.data)
                setGetXa()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleGetXa = (values) => {
        const data = {
            district_id: Number(values)
        }
        console.log(data.district_id);
        const name = GetQuan.filter(item => item.DistrictID == values);
        setnameQuan(name[0].DistrictName)

        setValueQuan(data.district_id)
        fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?${data.district_id}`, {
            method: 'POST', // or 'PUT'
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "token": "35fd8432-5c92-11ec-bde8-6690e1946f41"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGetXa(data.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const handleGetPhuong = (values) => {
        setValueXa(values)
        const name = GetXa.filter(item => item.WardCode == values);
        setnameHuyen(name[0].WardName)

    }


    const totalCart = useSelector(cartItemTotalSelector);
    const listCart = useSelector(state => state.cart);
    const handleSubmitOrder = async () => {
        try {
            const newDataCart = [...listCart.cartItem];
            console.log(newDataCart);
            // if (!newDataCart[0]) {
            //     return message.error("Bạn Cần Thêm Sản Phẩm vào giỏ hàng trước")
            // }
            const dataCart = []
            newDataCart.map(item => {
                const CartItem = {
                    idProduct: item.id,
                    quantity: item.quantity,
                    price: item.productDetail.price
                }
                dataCart.push(CartItem);
            })
            const DataAddress = `${nameHuyen} - ${nameQuan} - Tỉnh ${nameTinh}`
            const total = totalCart + PriceShip - PriceCoupon
            const idUser = IdUser;
            if (!ValueEmail) {
                return message.error("Email không được để trắng")
            }

            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (ValueEmail.match(mailformat) == null) {
                return message.error("Vui lòng nhập đúng định dạng của email")
            }

            if (!ValueName) {
                return message.error("Tên không được để trắng")
            }

            if (!ValuePhone) {
                return message.error("Số điện thoại không được để trắng")
            }

            var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

            if (ValuePhone.match(phoneno) == null) {
                return message.error("Vui lòng nhập Số điện thoại đúng")
            }

            if (!nameHuyen) {
                return message.error("Vui lòng thêm địa chỉ")
            }

            const DataOrder = {
                idUser,
                fullName: ValueName,
                phone: ValuePhone,
                address: DataAddress,
                email: ValueEmail,
                orderDetail: dataCart,
                total,
                code: IdCode
            }
            console.log(DataOrder);

            const res = await orderApi.AddOrder(DataOrder)
            console.log(res);
            if (IdUser) {
                Swal.fire("Đặt hàng thành công", "success");
                const action = ResetCart({});
                dispatch(action);
                history.push(`order-detail/${res.data.data.idOrder}`)
            } else {
                const action = ResetCart({});
                dispatch(action);
                Swal.fire("Đặt hàng thành công", `<div>
                <p>Vui lòng kiểm tra mail để xác nhận đơn hàng</p>
                <p><a style="padding: 5px;background: #e4f4da;text-decoration: none;border-radius: 3px;font-weight:600" href='https://mail.google.com/mail'>Đến trang gmail</a></p>
                </div> `, "success");
            }


        }
        catch (err) {
            console.log(err);
        }

    }

    const handleCheckCoupon = async () => {
        try {
            console.log(ValueCoupon);
            const filter = {
                code: ValueCoupon
            }
            const res = await couponApi.GetCoupon(filter);
            setPriceCoupon(res.data[0].percent);
            setIdCode(res.data[0]._id)
            message.success("Áp dụng thành công");
        } catch (err) {
            console.log(err);
            message.error("Mã giảm giá đã được sử dụng");
        }
    }
    const handleResetCoupon = async () => {
        setPriceCoupon(0);
        setIdCode();
        message.error("Đã Hủy Áp Dụng");
    }

    return (
        <div>
            <BannerProduct>
                <h2>Giỏ hàng</h2>
            </BannerProduct>
            <div className="layout">
                <table className="shop-table">
                    <thead>
                        <tr>
                            <th className="cart-product-remove"></th>
                            <th className="cart-product-image"></th>
                            <th className="cart-product-name">Sách</th>
                            <th className="cart-product-price">Giá</th>
                            <th className="cart-product-quantity">Số lượng</th>
                            <th className="cart-product-total">Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listCart.cartItem.length === 0 ?
                                <tbody className="Emty">
                                    <tr><Empty /></tr>
                                </tbody>
                                :
                                listCart.cartItem.map(item => (
                                    <ItemCart item={item}></ItemCart>
                                ))
                        }
                    </tbody>

                </table>
                <div className="cart-apply" >
                    <div className="cart-apply_coupon">
                        <input style={{ color: "#000" }} type="text" name="" id="" onChange={e => setValueCoupon(e.target.value)} value={ValueCoupon} className="ButtonPara btn" placeholder="Mã giảm giá" />
                        <button className="ButtonBanner btn" onClick={handleCheckCoupon}>Áp Dụng Mã</button>
                        <button style={{ margin: "0 20px" }} className="ButtonBanner btn" onClick={handleResetCoupon}>Hủy Áp Dụng </button>
                    </div>
                </div>
                <div className="cart-form">
                    <div className="cart-form_shipping">
                        <h2>Thông tin</h2>
                        <form action="">
                            <div className="cart-form_box">
                                <Input onChange={e => setValueEmail(e.target.value)} value={ValueEmail} type="email" placeholder="Email" />
                            </div>
                            <div className="cart-form_box">
                                <Input onChange={e => setValueName(e.target.value)} value={ValueName} type="text" placeholder="Họ và tên" />
                            </div>
                            <div className="cart-form_box">
                                <Input onChange={e => setValuePhone(e.target.value)} type="text" placeholder="Số điện thoại" />
                            </div>
                            <div className="cart-form_box">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Tỉnh thành"
                                    optionFilterProp="children"
                                    onChange={handleGetQuan}
                                >{
                                        GetTinh &&

                                        GetTinh.map(item => (
                                            <Option key={item.ProvinceID} value={item.ProvinceID}>{item.ProvinceName}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className="cart-form_box">
                                {
                                    GetQuan
                                        ?
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Quân huyện"
                                            optionFilterProp="children"
                                            onChange={handleGetXa}
                                            value={GetQuan[0].DistrictID}
                                        >
                                            {GetQuan.map(item => (
                                                <Option key={item.DistrictID} value={item.DistrictID}>{item.DistrictName}</Option>

                                            ))}
                                        </Select>
                                        :
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Quân huyện"
                                            optionFilterProp="children"
                                            disabled
                                        />
                                }

                            </div>
                            <div className="cart-form_box">
                                {
                                    GetXa
                                        ?
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Phường xã"
                                            optionFilterProp="children"
                                            onChange={handleGetPhuong}
                                            value={GetXa[0].WardCode}
                                        >
                                            {GetXa.map(item => (
                                                <Option key={item.WardCode} value={item.WardCode}>{item.WardName}</Option>
                                            ))}
                                        </Select>
                                        :
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Phường xã"
                                            optionFilterProp="children"
                                            disabled
                                        />
                                }
                            </div>
                            <div className="cart-form_box">
                                <textarea name="" id="" placeholder="Ghi chú"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="cart-form_total">
                        <h2>Tổng đơn</h2>
                        <table className="cart-total_table">
                            <tbody>
                                <tr>
                                    <th>Tạm tính</th>

                                    <td>{totalCart.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                                <tr>
                                    <th>Phí vận chuyển</th>
                                    <td>{PriceShip.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                                <tr>
                                    <th>Tổng</th>
                                    <td>
                                        <strong>{((totalCart + PriceShip - PriceCoupon) <= 0 ? 0 : totalCart + PriceShip - PriceCoupon).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span style={{ margin: '20px 0', padding: '20px 30px' }} className="ButtonBanner btn" onClick={handleSubmitOrder}>thanh toán</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
