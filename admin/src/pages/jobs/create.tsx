import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export function JobCreate() {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Company" name="company_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Location" name="location" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Employment Type" name="employment_type" initialValue="full_time">
          <Select
            options={[
              { value: "full_time", label: "Full Time" },
              { value: "part_time", label: "Part Time" },
              { value: "contract", label: "Contract" },
              { value: "internship", label: "Internship" },
              { value: "remote", label: "Remote" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Salary Range" name="salary_range">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status" initialValue="draft">
          <Select
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
}
