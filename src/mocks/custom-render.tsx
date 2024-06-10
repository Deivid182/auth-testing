import { render } from "@testing-library/react";
import { AppProvider } from "../providers/app-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const customRender = (ui: React.ReactElement) => {

  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        {ui}
      </AppProvider>
    </QueryClientProvider>
  );
}