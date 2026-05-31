import { List, useTable } from "@refinedev/antd";
import { Table, Tag } from "antd";

interface ApplicationRecord {
  id: number;
  job_title: string;
  applicant: { username: string };
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "gold",
  reviewed: "blue",
  accepted: "green",
  rejected: "red",
};

export function ApplicationList() {
  const { tableProps } = useTable<ApplicationRecord>({
    syncWithLocation: true,
  });

  return (
    <List title="Applications">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="job_title" title="Job" />
        <Table.Column
          title="Applicant"
          render={(_, record: ApplicationRecord) => record.applicant?.username}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value: string) => (
            <Tag color={statusColors[value] || "default"}>{value}</Tag>
          )}
        />
        <Table.Column dataIndex="created_at" title="Applied" />
      </Table>
    </List>
  );
}
