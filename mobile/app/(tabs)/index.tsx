import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { fetchJobs, Job } from "@/lib/auth";

const employmentLabels: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
  remote: "Remote",
};

export default function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(() => setError("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>No jobs available</Text>}
      renderItem={({ item }) => (
        <Link href={`/jobs/${item.id}`} asChild>
          <Pressable style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.company}>{item.company_name}</Text>
            <View style={styles.meta}>
              <Text style={styles.metaText}>{item.location}</Text>
              <Text style={styles.metaText}>
                {employmentLabels[item.employment_type] || item.employment_type}
              </Text>
            </View>
            {item.salary_range ? (
              <Text style={styles.salary}>{item.salary_range}</Text>
            ) : null}
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  company: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  meta: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  metaText: {
    fontSize: 13,
    color: "#888",
  },
  salary: {
    fontSize: 14,
    color: "#4f46e5",
    fontWeight: "500",
    marginTop: 8,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: 32,
  },
  error: {
    color: "#dc2626",
  },
});
