import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";

export default function AddUpdateDeviceTypes(props) {
  const [form] = Form.useForm();
  const { action, devType } = props;

  const { actionDrawer, addDeviceTypeThunk, updateDeviceTypeThunk, getDeviceTypesThunk } =
    useStoreActions((actions) => actions.deviceTypes);
  const { drawerVisible } = useStoreState((state) => state.deviceTypes);

  const onFinish = async (values) => {
    try {
      if (action === "ADD") {
        let result = await addDeviceTypeThunk(values);
      } else if (action === "UPDATE") {
        let result = await updateDeviceTypeThunk({
          ...values,
          id: devType?.id,
        });
      }

      getDeviceTypesThunk("y");
    } catch (e) {
      console.log("Error :" + e);
    }

    actionDrawer();

  };

  const onDrawerOpened = () => {
    if (drawerVisible) {
      form.setFieldsValue({
        deviceType: devType?.deviceType,
      });
    }
  };

  return (
    <div>
      <Drawer
        title="Add Device Type"
        open={drawerVisible}
        onClose={actionDrawer}
        afterOpenChange={onDrawerOpened}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="deviceType"
                label="Device Type"
                rules={[
                  { required: true, message: "Device type is required." },
                ]}
              >
                <Input placeholder="Please enter device type" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {action === "ADD" ? "Submit" : "Update"}
                  </Button>
                  <Button htmlType="button" onClick={actionDrawer}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}
