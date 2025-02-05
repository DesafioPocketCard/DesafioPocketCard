import { Header } from "../..";
import { Main, Wrapper } from "./styles";
import { IPageWrapperProps } from "./types";

export default function PageWrapper({ children }: IPageWrapperProps) {
  return (
    <Wrapper>
      <Header />
      <Main component="main">{children}</Main>
    </Wrapper>
  );
}
