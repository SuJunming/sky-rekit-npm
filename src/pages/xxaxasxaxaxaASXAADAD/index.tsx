import React, { useEffect, useState } from "react";
import C from "@C";
import { PageWrapper, TableFactory, RangePicker } from "@components/index";
import { Form, Input, Select, Button } from "antd";
import { SearchOutlined, RetweetOutlined } from "@ant-design/icons";
import { omit } from "lodash";

import './index.scss'


const { Option } = Select;

const xxaxasxaxaxaASXAADAD: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState<any>({
    page: 1,
    size: 10,
  });

  const fetchList = async () => {
    setLoading(true);
    await props.actions.getList(filterParams);
    setLoading(false);
  };

  const onSort = (data: any) => {
    setFilterParams({
      ...filterParams,
     // createTimeDirection: data.order === "ascend" ? "ASC" : undefined,
      page: data.current,
    });
  };

  const onChange = (page: any) => {
    setFilterParams({
      ...filterParams,
      page,
    });
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      const params = {
        [values.op]: values.value,
        ...values,
      };
      // hack 三种方式都需要去除
      setFilterParams({
        ...omit(filterParams, ["productName", "ticketNo", "title"]),
        ...params,
      });
    });
  };

  const handleReset = () => {
    form.resetFields();
    setFilterParams({
      page: 1,
      size: 10,
    });
  };

  useEffect(() => {
    fetchList();
  }, [filterParams]);

  const { list } = props.xxaxasxaxaxaASXAADAD;
  const { total, page } = list;

  return (
<div className='xxaxasxaxaxa-a-s-x-a-a-d-a-d-page'>
    <PageWrapper title="xxaxasxaxaxaASXAADAD">
        <Form form={form} colon={false} initialValues={{ op: "ticketNo" }}>
          <Form.Item>
            <Input.Group compact>
              <Form.Item name={"op"} noStyle>
                <Select>
                  <Option value="ticketNo">工单编号</Option>
                  <Option value="productName">产品名称</Option>
                  <Option value="title">工单标题</Option>
                </Select>
              </Form.Item>
              <Form.Item name={"value"} noStyle>
                <Input style={{ width: "63.8%" }} placeholder="请输入搜索内容" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item name="time">
            <RangePicker placeholder={["选择提交时间", "选择提交时间"]} />
          </Form.Item>
        </Form>
        <div>
          <Button
            icon={<SearchOutlined />}
            type="primary"
            className="search"
            onClick={handleSearch}
          >
            搜索
          </Button>
          <Button icon={<RetweetOutlined />} className="reset" onClick={handleReset}>
            重置
          </Button>
        </div>
      <TableFactory
        loading={loading}
        columns={[]}
        dataSource={list.data || []}
        scroll={{ x: 100 }}
        onSort={onSort}
        pagination={{
          total: total,
          current: page,
          pageSize: filterParams.pageSize,
          onChange,
          showTotal: (total:any) => `共 ${total} 条`,
        }}
      />
    </PageWrapper>
</div>
  );
};

export default C({
    modal: 'xxaxasxaxaxaASXAADAD',
    Component: xxaxasxaxaxaASXAADAD,
    title: 'xxaxasxaxaxaASXAADAD'
})

      