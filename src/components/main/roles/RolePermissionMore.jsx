import { Collapse, Modal , Space } from 'antd';
import { MoreOutlined  } from "@ant-design/icons";

const RolePermissionMore = (permissions) => {
  
  const info = () => {
    Modal.info({
      title: 'Permissions',
      content: (
        <Collapse ghost>
          {
            permissions.permissions.map(item => {
              return (
                <span>{item.title}{permissions.permissions.length > 1 ? "," : null} </span>
              )
            })
          }
        </Collapse>
      ),
      onOk() {},
    })
  }

  return (
    <>
      <Space wrap>
        <MoreOutlined onClick={info} />
      </Space>
    </>
  );
};
export default RolePermissionMore;