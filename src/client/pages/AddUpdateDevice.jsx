import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";

export default function AddUpdateDevice(props) {
  const [form] = Form.useForm();
  const { action, device } = props;

  const { addDeviceThunk, updateDeviceThunk, actionDrawer } = useStoreActions(
    (actions) => actions.devices
  );
  const { drawerVisible } = useStoreState((state) => state.devices);

  const { isDeviceTypeLoading, deviceTypes } = useStoreState(
    (state) => state.deviceTypes
  );
  const { getDeviceTypesThunk } = useStoreActions(
    (actions) => actions.deviceTypes
  );

  const { TextArea } = Input;

  useEffect(() => {
    getDeviceTypesThunk();
  }, []);

  const onFinish = async (values) => {
    if (action === "ADD") {
      let result = await addDeviceThunk(values);
    } else if (action === "UPDATE") {
      let result = await updateDeviceThunk({ ...values, id: device?.id });
    }

    actionDrawer();
  };

  const onDrawerOpened = () => {
    if (drawerVisible) {
      form.setFieldsValue({
        serialNo: device?.serialNo,
        model: device?.model,
        powerAdapter: device?.powerAdapter,
        bag: device?.bag,
        typeId: device?.typeId,
        warranty: device?.warranty,
        warrantyPeriod: device?.warrantyPeriod,
        isAvailable: device?.isAvailable,
        remarks: device?.remarks,
      });
    }
  };

  return (
    <div>
      <Drawer
        title={"Add Device"}
        open={drawerVisible}
        afterOpenChange={onDrawerOpened}
        onClose={actionDrawer}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={"serialNo"}
                label={"Serial No"}
                rules={[
                  { required: true, message: "Serial Number is required." },
                ]}
              >
                <Input placeholder="Please enter Serial No" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={"model"}
                label={"Model"}
                rules={[{ required: true, message: "Model is required." }]}
              >
                <Input placeholder="Please enter Model" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"powerAdapter"}
                label={"Power Adapter"}
                rules={[
                  {
                    required: true,
                    message: "Power Adapter availability is required.",
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: true,
                      label: "Yes",
                    },
                    {
                      value: false,
                      label: "No",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"bag"}
                label={"Bag"}
                rules={[
                  { required: true, message: "Bag availability is required." },
                ]}
              >
                <Select
                  options={[
                    {
                      value: true,
                      label: "Yes",
                    },
                    {
                      value: false,
                      label: "No",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {deviceTypes.length == 0 ? (
                ""
              ) : (
                <Form.Item
                  name={"typeId"}
                  label={"Type"}
                  rules={[
                    { required: true, message: "Device type is required." },
                  ]}
                >
                  <Select
                    options={deviceTypes.map((v, i) => ({
                      value: v.id,
                      label: v.type,
                    }))}
                  ></Select>
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={"warranty"} label={"Warranty"}>
                <Select
                  options={[
                    {
                      value: true,
                      label: "Yes",
                    },
                    { value: false, label: "No" },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={"warrantyPeriod"}
                label={"Warranty Period"}
              >
                <Input placeholder="Please enter Warranty Period" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={"isAvailable"}
                label={"Device Available?"}
                initialValue={true}
              >
                <Select
                  options={[
                    {
                      value: true,
                      label: "Yes",
                    },
                    {
                      value: false,
                      label: "No",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={"remarks"} label={"Remarks"}>
                <TextArea rows={4} placeholder="Remarks ..." />
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
