import { Modal , Space } from 'antd';
import { MoreOutlined  } from "@ant-design/icons";

const PolicyActionsMore = (actions) => {
  const info = () => {
  Modal.info({
    title: 'Actions',
    content: (
        <div>
            {
                actions.actions.map(item => {
                    return (
                        <span>({item.title}){actions.actions.length > 1 ? "," : null} </span>
                    )
                })
            }
        </div>
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
export default PolicyActionsMore;