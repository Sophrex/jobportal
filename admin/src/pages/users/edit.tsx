import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export function UserEdit() {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Username" name="username">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select
            options={[
              { value: "job_seeker", label: "Job Seeker" },
              { value: "employer", label: "Employer" },
              { value: "staff", label: "Staff" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Company Name" name="company_name">
          <Input />
        </Form.Item>
        <Form.Item label="Staff Access" name="is_staff" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
}
