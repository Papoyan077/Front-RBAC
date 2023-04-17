import { Modal , Space } from 'antd';
import { MoreOutlined  } from "@ant-design/icons";

const PolicyActionsMore = (actions) => {
    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }
  const info = () => {
  Modal.info({
    title: 'Actions',
    content: (
        <div>
            {
                actions.actions.map(item => {
                    return (
                        <span key={`action${updateIndex()}`}>({item.title}){actions.actions.length > 1 ? "," : null} </span>
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