import { Button, Input, Modal , Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getClients, getModules , PostModule } from '../../../utils/Route';
const { Option } = Select;

const AddModule = ({render, setRender}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [moduleData, setModuleData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [client, setClient] = useState(null);
  const [parent , setParent] = useState(null);

  useEffect(() => {
      getModules(setModuleData);
  }, [render]);

  useEffect(() => {
    getClients(setClientData);
  }, [render]);

  const ChangeParent = (value) => {
    setParent(value);
  };
  const ChangeClient = (value) => {
    setClient(value);
  };
  console.log("Parent ==", parent , "Client ==" , client ,"Title ==" , title);
  const AddModule = async () => {
    PostModule(title , render , setRender , client  , parent);
    setOpen(false);
    setTitle('');
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Add Module
      </Button>
      <Modal
        title="Add Module"
        centered
        open={open}
        onOk={() => AddModule()}
        onCancel={() => {
          setOpen(false)}
        }
        width={600}
      >
        <Space
          direction="vertical"
          style={{
              width: '100%',
            }}
        >
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)} 
              placeholder="Title"
            />
          <Select mode='multiple' maxTagCount="responsive" style={{width : "100%"}} placeholder="Select Parent" onChange={ChangeParent}>
            { moduleData ?
              moduleData.map(item => {
                return(
                  <Option key={item.id} value={item.id}>
                   {item.title}
                  </Option>
                )
              })
            : null}
          </Select>

          <Select mode='multiple' style={{width : "100%"}} placeholder="Select Client" onChange={ChangeClient}>
            { clientData ?
              clientData.map(item => {
                return(
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                )
              })
            : null}
          </Select>
        </Space>
      </Modal>
    </>
  );
};
export default AddModule;