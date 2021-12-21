import React, { useEffect, useState } from "react";
import { Button, PageHeader, Row, Col } from 'antd';
import Swal from 'sweetalert2';
import { useHistory } from "react-router";
import permissionApi from "../../../../api/permissionApi";
import FromPermisAdd from "./Components/FormPermissAdd";
import ListPermission from "./Components/ListPermission";


const Permission = () => {
    const [demo, setdemo] = useState('')
    const [DataPermission, setDataPermission] = useState([]);
    let history = useHistory();

    const handleRemove = (id)=>{
        try{
            const fetchRemovePermissions = async (data) => {
                try {
                    const res = await permissionApi.DelPermission(data);
                    if (res.status === 200) {
                        Swal.fire('Xóa', 'Xóa Thành Công!', 'success').then((result) => {
                            if (result.isConfirmed) {
                                setdemo(pre=>pre+1);
                                history.push({ pathname: '/admin/permission' })
                            }
                        })
                    }
                } catch (err) {
                    Swal.fire('Lỗi', 'Không đủ Thẩm quyền đề xóa', 'error').then((result) => {
                        if (result.isConfirmed) {
                            console.log(1);
                            setdemo(pre=>pre+1);
                            history.push({ pathname: '/admin/permission' })
                        }
                    })
                }
            }
    
            fetchRemovePermissions(id);
    
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchPermissions = async () => {
          const res = await permissionApi.GetPermission()
          setDataPermission(res);
        }
    
        fetchPermissions();
      }, [demo])

    return (
        <div className="CatalogsPage">
            <PageHeader
                className="site-page-header"
                title="Trang quyền"
            />

           
            <Row className='ListCata'>
                <Col span={24}>
                    <ListPermission data={DataPermission.data} handleRemove={handleRemove} />
                </Col>
            </Row>
        </div>
    );
}

export default Permission;