import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { fetchJob, Job } from "@/lib/auth";

const employmentLabels: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchJob(id)
        .then(setJob)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.center}>
        <Text>Job not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company_name}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>{job.location}</Text>
        <Text style={styles.meta}>
          {employmentLabels[job.employment_type] || job.employment_type}
        </Text>
      </View>

      {job.salary_range ? (
        <Text style={styles.salary}>{job.salary_range}</Text>
      ) : null}

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{job.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },
  company: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
  },
  meta: {
    fontSize: 14,
    color: "#888",
  },
  salary: {
    fontSize: 16,
    color: "#4f46e5",
    fontWeight: "600",
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
});
