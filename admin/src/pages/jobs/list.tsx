import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Tag } from "antd";

interface JobRecord {
  id: number;
  title: string;
  company_name: string;
  location: string;
  status: string;
  employment_type: string;
}

export function JobList() {
  const { tableProps } = useTable<JobRecord>({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="company_name" title="Company" />
        <Table.Column dataIndex="location" title="Location" />
        <Table.Column dataIndex="employment_type" title="Type" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => (
            <Tag color={value === "published" ? "green" : "default"}>{value}</Tag>
          )}
        />
        <Table.Column
          title="Actions"
          render={(_, record: JobRecord) => (
            <EditButton recordItemId={record.id} />
          )}
        />
      </Table>
    </List>
  );
}
