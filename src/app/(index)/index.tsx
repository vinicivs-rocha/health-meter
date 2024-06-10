import { IndexViewModel } from "@/adapters/view-models";
import { useAppInjector } from "@/hooks/app-injector";
import IndexController from "./controller";

export default function IndexPage() {
  const viewModel = useAppInjector<IndexViewModel>("IndexViewModel");
  return <IndexController viewModel={viewModel}></IndexController>;
}
