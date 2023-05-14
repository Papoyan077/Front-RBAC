import { Modal } from 'antd';
import { ExclamationCircleFilled } from "@ant-design/icons";
import { cancel, error, succesDelete } from "../../utils/Messages";
import instance from "../../utils/axios";
const { confirm } = Modal;

const showDeleteConfirm = (record, apiName, name , data) => {
    confirm({
        title: 'Are you sure delete this action?',
        icon: <ExclamationCircleFilled />,
        content: `${name} name is (${record.title}):`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            data((item) => {
                return item.filter((item) => item.id !== record.id);
            });
            instance.delete(`/${apiName}/${record.id}`)
                .then(() => {
                    succesDelete();
                })
                .catch(err => error(err.message));
        },
        onCancel() {
            cancel();

        },
    });
};

export { showDeleteConfirm };