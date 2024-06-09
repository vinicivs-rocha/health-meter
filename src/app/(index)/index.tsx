import { IndexViewModel } from "@/adapters/view-models";
import { useAppInjector } from "@/hooks/app-injector";
import { StyleSheet } from "react-native";
import IndexController from "./controller";

export default function IndexPage() {
  const viewModel = useAppInjector<IndexViewModel>("IndexViewModel");
  return <IndexController viewModel={viewModel}></IndexController>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
