import { List, useTable } from "@refinedev/antd";
import { Table, Tag } from "antd";

interface UserRecord {
  id: number;
  username: string;
  email: string;
  role: string;
  is_staff: boolean;
}

export function UserList() {
  const { tableProps } = useTable<UserRecord>({
    syncWithLocation: true,
  });

  return (
    <List title="Users">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="username" title="Username" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="role"
          title="Role"
          render={(value: string) => <Tag>{value}</Tag>}
        />
        <Table.Column
          dataIndex="is_staff"
          title="Staff"
          render={(value: boolean) => (value ? "Yes" : "No")}
        />
      </Table>
    </List>
  );
}
