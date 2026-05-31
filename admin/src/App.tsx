import { AuthPage, ThemedLayout, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { ApplicationList } from "./pages/applications/list";
import { JobCreate } from "./pages/jobs/create";
import { JobEdit } from "./pages/jobs/edit";
import { JobList } from "./pages/jobs/list";
import { UserEdit } from "./pages/users/edit";
import { UserList } from "./pages/users/list";

function AppLayout() {
  return (
    <ThemedLayout>
      <Outlet />
    </ThemedLayout>
  );
}

function AuthenticatedWrapper({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Authenticated key="authenticated" fallback={fallback ?? <CatchAllNavigate to="/login" />}>
      {children}
    </Authenticated>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#4f46e5" } }}>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "jobs",
                list: "/jobs",
                create: "/jobs/create",
                edit: "/jobs/edit/:id",
                meta: { label: "Jobs" },
              },
              {
                name: "applications",
                list: "/applications",
                meta: { label: "Applications" },
              },
              {
                name: "users",
                list: "/users",
                edit: "/users/edit/:id",
                meta: { label: "Users" },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <AuthenticatedWrapper>
                    <AppLayout />
                  </AuthenticatedWrapper>
                }
              >
                <Route index element={<NavigateToResource resource="jobs" />} />
                <Route path="/jobs">
                  <Route index element={<JobList />} />
                  <Route path="create" element={<JobCreate />} />
                  <Route path="edit/:id" element={<JobEdit />} />
                </Route>
                <Route path="/applications">
                  <Route index element={<ApplicationList />} />
                </Route>
                <Route path="/users">
                  <Route index element={<UserList />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                </Route>
                <Route path="*" element={<CatchAllNavigate to="/jobs" />} />
              </Route>
              <Route
                path="/login"
                element={
                  <AuthenticatedWrapper fallback={<Outlet />}>
                    <NavigateToResource resource="jobs" />
                  </AuthenticatedWrapper>
                }
              >
                <Route index element={<AuthPage type="login" />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
