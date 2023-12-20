import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment/moment";
import React, { useEffect } from "react";

export default function AddUpdateDeviceAllocation(props) {
  const [form] = Form.useForm();
  const { Text } = Typography;

  const { drawerVisible } = useStoreState((state) => state.allocations);
  const {
    actionDrawer,
    addAllocationThunk,
    updateAllocationThunk,
    getAllocationsThunk,
  } = useStoreActions((actions) => actions.allocations);

  const { isDeviceLoading, devices } = useStoreState((state) => state.devices);
  const { getDevicesUsingFilter, updateDeviceThunk } = useStoreActions(
    (actions) => actions.devices
  );

  const { isEmpLoading, employees } = useStoreState((state) => state.employees);
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);

  useEffect(() => {
    getEmployeesThunk("none");
    getDevicesUsingFilter({ isAvailable: true });
  }, []);

  const options = [];
  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
    });
  }

  const { action } = props;

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onDrawerOpened = () => {
    if (drawerVisible) {
      form.setFieldsValue({
        handedOn: moment(Date.now()),
        hasReturned: false,
      });
    }
  };

  const onFinish = async (values) => {
    if (action === "ADD") {
      let result = await addAllocationThunk(values);
    } else if (action === "UPDATE") {
      let result = await updateAllocationThunk(values);
    }

    let updateResult = await updateDeviceThunk({
      serialNo: values?.deviceId,
      isAvailable: values?.hasReturned,
    });

    getAllocationsThunk();
    actionDrawer();
  };

  return (
    <div>
      <Drawer
        title={"Allocate Device"}
        open={drawerVisible}
        afterOpenChange={onDrawerOpened}
        onClose={actionDrawer}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              {devices.length == 0 ? (
                <Space style={{ padding: "0px 0px 15px 10px" }}>
                  <Text type="danger">No available devices found.</Text>
                </Space>
              ) : (
                <Form.Item
                  name={"deviceId"}
                  label={"Device"}
                  rules={[{ required: true, message: "Device is required." }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a Device"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={devices.map((v, i) => ({
                      value: v.serialNo,
                      label: v.serialNo,
                    }))}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {employees.length == 0 ? (
                ""
              ) : (
                <Form.Item
                  name={"employeeId"}
                  label={"Employee"}
                  rules={[{ required: true, message: "Employee is required." }]}
                >
                  <Select
                    showSearch
                    placeholder="Select an Employee"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={employees.map((v, i) => ({
                      value: v.coreId,
                      label: `${v.firstName} ${v.lastName}`,
                    }))}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={"userId"}
                label={"Authorized By"}
                initialValue={"JD1234"}
              >
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={"handedOn"} label={"Handed On"}>
                <DatePicker style={{ width: "100%" }} format={"YYYY/MM/DD"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={"hasReturned"} label={"Returned?"}>
                <Select
                  options={[
                    {
                      label: "Yes",
                      value: true,
                    },
                    {
                      label: "No",
                      value: false,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={"returnedOn"} label={"Returned On"}>
                <DatePicker style={{ width: "100%" }} format={"YYYY/MM/DD"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={devices.length == 0}
                  >
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
