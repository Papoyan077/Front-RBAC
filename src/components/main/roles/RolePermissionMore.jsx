import { Collapse, Modal , Space } from 'antd';
import { MoreOutlined  } from "@ant-design/icons";

const RolePermissionMore = (permissions) => {
  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }
  const info = () => {
    Modal.info({
      title: 'Permissions',
      content: (
        <Collapse ghost>
          {
            permissions.permissions.map(item => {
              return (
                <span key={`permissions${updateIndex()}`}>({item.title}){permissions.permissions.length > 1 ? "," : null} </span>
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