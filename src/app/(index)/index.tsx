import { useAppInjector } from "@/hooks/app-injector";
import IndexController from "./controller";
import { IndexViewModel } from "./view-model";

export default function IndexPage() {
  const viewModel = useAppInjector<IndexViewModel>("IndexViewModel");
  return <IndexController viewModel={viewModel}></IndexController>;
}
