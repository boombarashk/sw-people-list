import React, { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import theme from "antd/es/theme";
import ru from "antd/locale/ru_RU";
import { store } from "./store/store";
import App from "./App";

const queryClient = new QueryClient();

const { darkAlgorithm } = theme;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={ru}
      theme={{
        algorithm: darkAlgorithm,
      }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
